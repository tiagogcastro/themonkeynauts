import { Contract, BrowserProvider, parseUnits } from 'ethers';
import { address } from '@/config/ethereum';
import { spcABI } from '@/services/SPCCrypto/abi';

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
    const provider = new BrowserProvider(ethereum);
    const signer = fromAddress
      ? await provider.getSigner(fromAddress)
      : await provider.getSigner();
    const signerAddress = await signer.getAddress();

    if (cryptoType === 'BNB') {
      const sent = await signer.sendTransaction({
        to: toAddress || address.SALES,
        value: parseUnits(ether, 'ether'),
      });

      transaction = sent.hash;
    } else {
      const contract = new Contract(address.SPC, spcABI, signer);

      const sent = await contract.transfer(
        toAddress || address.SALES,
        parseUnits(ether, 'ether'),
      );

      const receipt = await sent.wait();

      transaction = receipt?.hash || sent.hash;
    }

    void signerAddress;
  } catch (err) {
    error = err;
  }

  return {
    transaction,
    error,
  };
};
