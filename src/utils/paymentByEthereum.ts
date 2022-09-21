import { address } from '@/config/ethereum';
import { spcABI } from '@/services/SPCCrypto/abi';
import Web3 from 'web3';

export type MetaMaskPaymentParams = {
  ether: string;
  fromAddress?: string;
  dataContract?: string;
  toAddress?: string;
  ethereum: any;
  cryptoType: 'BNB' | 'SPC' | 'BUSD';
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
  cryptoType,
}: MetaMaskPaymentParams): Promise<PaymentByEthereumResponse> => {
  let transaction = '';
  let error: any = {};

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

    const web3 = new Web3(ethereum);
    const newContract = new web3.eth.Contract(spcABI as any, dataContract);

    const transactionParameters = {
      to: toAddress || cryptoType === 'SPC' ? address.SPC : address.SALES, 
      from: fromAddress || ethereum.selectedAddress,
      value: ether,
      data: dataContract,
    };

    if(cryptoType === 'BNB') {
      transaction = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });
    } else {
      const { transactionHash } = await newContract.methods.transfer(
        transactionParameters.to, 
        transactionParameters.value
      )
      .send({
        from: transactionParameters.from
      })
      transaction = transactionHash;
    }
  } catch (err) {
    error = err
  }

  return {
    transaction,
    error,
  };
};