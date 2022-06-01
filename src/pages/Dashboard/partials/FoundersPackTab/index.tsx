import { useMetaMask } from 'metamask-react';
import { toast } from 'react-toastify';

import { ethereum as ethereumConfig } from '@/config/ethereum';
import { paymentByEthereum } from '@/utils';

import { Button } from '@/components';
import { COLORS } from '@/theme';

import {
  Container,
  Content,
  Card,
  CardContainer,
  CardContent,
} from './styles';

import notfound from '@/assets/notfound.png';

export function FoundersPackTab() {
  const { ethereum } = useMetaMask();
    
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { error, transaction } = await paymentByEthereum({
      ethereum,
      toAddress: ethereumConfig.sendTransaction.toAddress,
      ether: '1',
      dataContract: ethereumConfig.sendTransaction.dataContract,
    });

    if(error) {
      toast(error.message, {
        autoClose: 5000,
        pauseOnHover: true,
        type: 'error',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.red_0,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });
    }
  }

  return (
    <Container>
      <Content>
        <Card onSubmit={handleSubmit}>
          <CardContainer>
            <h1 className="card_title">Pack 1</h1>
            <CardContent>
              <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab mollitia praesentium saepe quia soluta vero atque error necessitatibus, perspiciatis cupiditate sit esse tenetur dolores sint. Explicabo doloribus fugit nesciunt? Culpa!</p>

              <img src={notfound} />
              <Button 
                text="BUY PACK" 
                type="submit"
                className="buy_pack"
              />
            </CardContent>
          </CardContainer>
          <span className="stock">XXX Available</span>
        </Card>
        <Card onSubmit={handleSubmit}>
          <CardContainer>
            <h1 className="card_title">Pack 1</h1>
            <CardContent>
              <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab mollitia praesentium saepe quia soluta vero atque error necessitatibus, perspiciatis cupiditate sit esse tenetur dolores sint. Explicabo doloribus fugit nesciunt? Culpa!</p>

              <img src={notfound} />
              <Button 
                text="BUY PACK" 
                type="submit"
                className="buy_pack"
              />
            </CardContent>
          </CardContainer>
          <span className="stock">XXX Available</span>
        </Card>
        <Card onSubmit={handleSubmit}>
          <CardContainer>
            <h1 className="card_title">Pack 1</h1>
            <CardContent>
              <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab mollitia praesentium saepe quia soluta vero atque error necessitatibus, perspiciatis cupiditate sit esse tenetur dolores sint. Explicabo doloribus fugit nesciunt? Culpa!</p>

              <img src={notfound} />
              <Button 
                text="BUY PACK" 
                type="submit"
                className="buy_pack"
              />
            </CardContent>
          </CardContainer>
          <span className="stock">XXX Available</span>
        </Card>
        <Card onSubmit={handleSubmit}>
          <CardContainer>
            <h1 className="card_title">Pack 1</h1>
            <CardContent>
              <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab mollitia praesentium saepe quia soluta vero atque error necessitatibus, perspiciatis cupiditate sit esse tenetur dolores sint. Explicabo doloribus fugit nesciunt? Culpa!</p>

              <img src={notfound} />
              <Button 
                text="BUY PACK" 
                type="submit"
                className="buy_pack"
              />
            </CardContent>
          </CardContainer>
          <span className="stock">XXX Available</span>
        </Card>
      </Content>
    </Container>
  );
}