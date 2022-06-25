import { ethereum as ethereumConfig } from '@/config/ethereum';
import { Player } from '@/services/app_api/player/types';

export function verifyEthereum() {
  const ethereum = (window as any).ethereum;

  if(typeof ethereum === 'undefined') {
    throw new Error("Activate ethereum in your browser");
  }

  return ethereum;
}

async function verifyChain(network: string, networkName: string) {
  const ethereum = verifyEthereum();

  const chainId = await ethereum.request({ method: 'eth_chainId' });

  if (chainId !== network) {
    throw new Error(`You are in wrong network. Please connect to ${networkName} network.`);
  }

  return chainId;
}

async function accountConnect(): Promise<string> {
  const ethereum = verifyEthereum();

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts?.[0] as string;

  if(!account) {
    throw new Error('You have not connected your metamask account.');
  }

  return account;
}

export async function verifyWallet(player: Player) {
  await verifyChain(ethereumConfig.network.mainNetBSC, 'BSC Mainnet');

  const account = await accountConnect();

  if(player && player.wallet) {
    const walletDifferent = account !== player?.wallet;

    if(walletDifferent) {
      throw new Error("Active metamask wallet is not the wallet that is linked in our system.");
    }
    return; 
  }

  throw new Error("You need to link your metamask first.");
}

export async function connectWallet(): Promise<string> {
  await verifyChain(ethereumConfig.network.mainNetBSC, 'BSC Mainnet');

  const account = await accountConnect();

  return account;
}