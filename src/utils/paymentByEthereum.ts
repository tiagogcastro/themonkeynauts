export type MetaMaskPaymentParams = {
  ether: string;
  fromAddress?: string;
  dataContract?: string;
  toAddress?: string;
  ethereum: any;
}

export type SuccessPaymentByEthereum = {
  transaction: string;
}

export type FailedPaymentByEthereum = {
  error: unknown;
}

export type PaymentByEthereumResponse = {
  transaction: string;
  error: any;
}

export const paymentByEthereum = async ({ 
  ether, 
  fromAddress, 
  toAddress, 
  dataContract,
  ethereum,
}: MetaMaskPaymentParams): Promise<PaymentByEthereumResponse> => {
  let transaction = '';
  let error: any = {};

  if(!toAddress) {
    return {
      error: '[internal error]: toAddress not found',
      transaction: ''
    }
  }

  if(!dataContract) {
    return {
      error: '[internal error]: dataContract not found',
      transaction: ''
    }
  }
  
  try {
    if(!ethereum.selectedAddress) {
      await ethereum.request({
        method: 'eth_requestAccounts'
      });
    }

    const transactionParameters = {
      to: toAddress, 
      from: fromAddress || ethereum.selectedAddress,
      value: ether,
      data: dataContract,
    };

    transaction = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters]
    });
  } catch (err) {
    error = err
  }

  return {
    transaction,
    error,
  };
};