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
import { useEffect, useState } from 'react';
import { baseApi } from '@/services/api';
import { getFormattedDate } from '@/utils/getFormattedDate';

type CommonSaleProps = {
  id: string;
  crypto: 'BNB' | 'BUSD' | 'SPC';
  type: 'Monkeynaut' | 'Ship' | 'Pack';
  price: number;
  startDate: string;
  endDate: string | null;
  quantity: number;
  totalUnitsSold: number;
  currentQuantityAvailable: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

type MonkeynautSale = CommonSaleProps & {
  private: number;
  sargeant: number;
  captain: number;
  major: number;
};

type ShipSale = CommonSaleProps & {
  rank_a: number;
  rank_b: number;
  rank_s: number;
};

type PackSale = CommonSaleProps & {
  basic: number;
  advanced: number;
  expert: number;
};

type Sales = {
  monkeynauts: MonkeynautSale[];
  ships: ShipSale[];
  packs: PackSale[];
}

export function FoundersPackTab() {
  const [sales, setSales] = useState<Sales>({} as Sales);

  async function getMonkeynautSale() {
    try {
      const response = await baseApi.get('/sale-events/list-monkeynauts');

      setSales(prevState => {
        return {
          ...prevState,
          monkeynauts: response.data,
        }
      })
    } catch (error: any) {
      console.log({error: error.message});
    }
  }

  async function getShipSale() {
    try {
      const response = await baseApi.get('/sale-events/list-ships');

      setSales(prevState => {
        return {
          ...prevState,
          ships: response.data,
        }
      });
    } catch (error: any) {
      console.log({error: error.message});
    }
  }

  async function getPackSale() {
    try {
      const response = await baseApi.get('/sale-events/list-packs');

      setSales(prevState => {
        return {
          ...prevState,
          packs: response.data,
        }
      })
    } catch (error: any) {
      console.log({error: error.message});
    }
  }

  async function getSalesEvent() {
    await getMonkeynautSale();
    await getShipSale()
    await getPackSale()
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { error, transaction } = await paymentByEthereum({
      ethereum: (window as any).ethereum,
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

  useEffect(() => {
    getSalesEvent()
  }, []);

  return (
    <Container>
      <Content>
        {sales?.monkeynauts && sales.monkeynauts.map(monkeynautSale => (
          <Card onSubmit={handleSubmit} key={monkeynautSale.id}>
            <CardContainer>
              <h1 className="card_title">{monkeynautSale.type}</h1>
              <CardContent>
                <p className="description">
                  Includes: <br />
                  1 {monkeynautSale.type} <br />
                  <br />
                  Probability: <br />
                  Private: {monkeynautSale.private}% <br />
                  Seargeant: {monkeynautSale.sargeant}% <br />
                  Captain: {monkeynautSale.captain}% <br />
                  Major: {monkeynautSale.major}% <br />
                <br />
                  {monkeynautSale.endDate && (
                    <>
                      Expires In: <br />
                      {getFormattedDate(monkeynautSale.endDate)} <br />
                    </>
                  )}
                </p>
                <img src={notfound} />
                <span className="price">Price {monkeynautSale.price} ${monkeynautSale.crypto}</span>
                <span className="more_info_text">Hover mouse for more info</span>
                <Button 
                  text="BUY PACK" 
                  type="submit"
                  className="buy_pack"
                />
              </CardContent>
            </CardContainer>
            <span className="stock">{monkeynautSale.currentQuantityAvailable}/{monkeynautSale.quantity} Available</span>
          </Card>
        ))}

        {sales?.ships && sales.ships.map(shipSale => (
          <Card onSubmit={handleSubmit} key={shipSale.id}>
            <CardContainer>
              <h1 className="card_title">{shipSale.type}</h1>
              <CardContent>
                <p className="description">
                  Includes: <br />
                  1 {shipSale.type} <br />
                  <br />
                  Probability: <br />
                  Rank A: {shipSale.rank_a}% <br />
                  Rank B: {shipSale.rank_b}% <br />
                  Rank S: {shipSale.rank_s}% <br />
                  <br />
                  {shipSale.endDate && (
                    <>
                      Expires In: <br /> 
                      {getFormattedDate(shipSale.endDate)} <br />
                    </>
                  )}
                </p>

                <img src={notfound} />
                <span className="price">Price {shipSale.price} ${shipSale.crypto}</span>
                <span className="more_info_text">Hover mouse for more info</span>
                <Button 
                  text="BUY PACK" 
                  type="submit"
                  className="buy_pack"
                />
              </CardContent>
            </CardContainer>
            <span className="stock">{shipSale.currentQuantityAvailable}/{shipSale.quantity} Available</span>
          </Card>
        ))}

        {sales?.packs && sales.packs.map(packSale => (
          <Card onSubmit={handleSubmit} key={packSale.id}>
            <CardContainer>
              <h1 className="card_title">{packSale.type}</h1>
              <CardContent>
                <p className="description">
                  Includes: <br />
                  1 {packSale.type} <br />
                  <br />
                  Probability: <br />
                  Basic: {packSale.basic}% <br />
                  Advanced: {packSale.advanced}% <br />
                  Expert: {packSale.expert}% <br />
                  <br />
                  {packSale.endDate && (
                    <>
                      Expires In: <br />
                      {getFormattedDate(packSale.endDate)} <br />
                    </>
                  )}
                </p>

                <img src={notfound} />
                <span className="price">Price {packSale.price} ${packSale.crypto}</span>
                <span className="more_info_text">Hover mouse for more info</span>
                <Button 
                  text="BUY PACK" 
                  type="submit"
                  className="buy_pack"
                />
              </CardContent>
            </CardContainer>
            <span className="stock">{packSale.currentQuantityAvailable}/{packSale.quantity} Available</span>
          </Card>
        ))}
      </Content>
    </Container>
  );
}