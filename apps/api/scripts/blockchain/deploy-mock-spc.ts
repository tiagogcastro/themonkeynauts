import fs from "node:fs";
import path from "node:path";

import { ethers, network } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const accounts = await ethers.getSigners();

  console.log(`\nNetwork:  ${network.name} (chainId ${(await ethers.provider.getNetwork()).chainId})`);
  console.log(`Deployer: ${deployer.address}\n`);

  const factory = await ethers.getContractFactory("MockSPC");
  const spc = await factory.deploy();
  await spc.waitForDeployment();

  const spcAddress = await spc.getAddress();
  console.log(`MockSPC:  ${spcAddress}`);

  // fund the first test accounts so they can act as players
  const fundAmount = ethers.parseEther("10000");
  for (const account of accounts.slice(1, 6)) {
    const tx = await spc.connect(deployer).transfer(account.address, fundAmount);
    await tx.wait();
    console.log(`Funded ${account.address} with ${ethers.formatEther(fundAmount)} SPC`);
  }

  const deploymentDir = path.join(__dirname, "..", "..", "deployments", network.name);
  fs.mkdirSync(deploymentDir, { recursive: true });
  const deployment = {
    network: network.name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    mockSpc: spcAddress,
    deployedAt: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(deploymentDir, "MockSPC.json"),
    `${JSON.stringify(deployment, null, 2)}\n`,
  );

  console.log("\nTest accounts (Hardhat default mnemonic):");
  for (const [i, account] of accounts.slice(0, 10).entries()) {
    const balance = await ethers.provider.getBalance(account.address);
    console.log(`  #${i} ${account.address} (${ethers.formatEther(balance)} ETH)`);
  }

  console.log("\nNext steps:");
  console.log(`  apps/api/.env      -> SMART_CONTRACT=${spcAddress}`);
  console.log(`  apps/api/.env      -> SALES_WALLET=<sales wallet address>`);
  console.log(`  apps/web/.env.local -> VITE_SPC_CONTRACT_ADDRESS=${spcAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
