// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev Mock $SPC token for local development (Hardhat network).
 * The deployer receives the initial supply and can distribute it to test accounts.
 * Anyone can pull tokens from the faucet - useful for simulating player wallets.
 */
contract MockSPC is ERC20 {
    uint256 public constant FAUCET_AMOUNT = 10_000 * 10 ** 18;

    constructor() ERC20("Space Coin", "SPC") {
        _mint(msg.sender, 100_000_000 * 10 ** decimals());
    }

    function faucet() external {
        _mint(msg.sender, FAUCET_AMOUNT);
    }
}
