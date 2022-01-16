import { useMetaMask } from 'metamask-react';
import { ethers } from 'ethers';

import { Button } from '@/components';

import {
  Container,
  Content,
  Card,
  CardContainer,
  CardContent,
} from './styles';

import notfound from '@/assets/notfound.png';

export type MetaMaskPaymentParams = {
  ether: string,
  address: string;
}

export function FoundersPackTab() {
  const { ethereum } = useMetaMask();
    
  const startPayment = async ({ ether, address }: MetaMaskPaymentParams) => {
    try {
      if (!ethereum) {
        await ethereum.request({
          method: 'eth_requestAccounts'
        });
      }

      const transactionParameters = {
        from: ethereum.selectedAddress,
        value: ether,
        data:
          '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
      };

      console.log({ether, address});

      const transaction = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });

      console.log({transaction});

      // const provider = new ethers.providers.Web3Provider(ethereum);
      // const signer = provider.getSigner();

      // ethers.utils.getAddress(address);
    } catch (err) {
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await startPayment({
      address: '0x3F55866B5Fd83554843a062f8B9424aC6b9c0ccd',
      ether: '1'
    });
  }

  return (
    <Container>
      <Content>
        <Card onSubmit={handleSubmit}>
          <CardContainer>
            <h1 className="card_title">Pack 1</h1>
            <CardContent>
              <img src={notfound} />
              <Button 
                text="BUY PACK" 
                type="submit"
              />
            </CardContent>
          </CardContainer>
          <span className="stock">XXX Available</span>
        </Card>
      </Content>
    </Container>
  );
}