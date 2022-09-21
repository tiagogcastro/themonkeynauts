const contracts = {
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  SPC: '0xc8031A63a8cE10574Aab7999a99cdC454B916AB9',
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
};

export const commonAddress = '0x6c4543b80c4A2Bb922e31E045a67217F13caf797';

export const ethereum = {
  sendTransaction: {
    toAddress: commonAddress,
    contract: contracts
  },
  privateSaleTransaction: {
    toAddress: commonAddress,
    contract: contracts
  },
  withdraw: {
    toAddress: '0x6538435b1fAA2B2b67ae19d472024275b4B722F6',
  },
  deposit: {
    toAddress: commonAddress,
    contract: contracts
  },
  network: {
    mainNetBSC: '0x38',
  }
}

export const address = {
  SPC: '0x6538435b1fAA2B2b67ae19d472024275b4B722F6',
  SALES: commonAddress
}