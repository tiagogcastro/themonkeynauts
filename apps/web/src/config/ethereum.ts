const contracts = {
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  SPC: import.meta.env.VITE_SPC_CONTRACT_ADDRESS,
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
};

export const commonAddress = import.meta.env.VITE_SALES_WALLET;

export const ethereum = {
  sendTransaction: {
    toAddress: commonAddress,
    contract: contracts,
  },
  privateSaleTransaction: {
    toAddress: commonAddress,
    contract: contracts,
  },
  withdraw: {
    toAddress: commonAddress,
  },
  deposit: {
    toAddress: commonAddress,
    contract: contracts,
  },
  network: {
    mainNetBSC: import.meta.env.VITE_BSC_CHAIN_ID_HEX || '0x38',
  },
};

export const address = {
  SPC: import.meta.env.VITE_SPC_CONTRACT_ADDRESS,
  SALES: commonAddress,
};
