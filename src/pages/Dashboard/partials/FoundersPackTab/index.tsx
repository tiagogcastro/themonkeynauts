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
import { useAuth } from '@/hooks';
import { ethers } from 'ethers';

type CommonSaleProps = {
  id: string;
  crypto: 'BNB' | 'BUSD' | 'SPC';
  saleType: 'Monkeynaut' | 'Ship' | 'Pack';
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
  sergeant: number;
  captain: number;
  major: number;
};

type ShipSale = CommonSaleProps & {
  rank_a: number;
  rank_b: number;
  rank_s: number;
};

type PackSale = CommonSaleProps & {
  type: 'BASIC' | 'ADVANCED' | 'EXPERT' | 'RANDOM';
};

type Sales = {
  monkeynauts: MonkeynautSale[];
  ships: ShipSale[];
  packs: PackSale[];
}

export function FoundersPackTab() {
  const [sales, setSales] = useState<Sales>({} as Sales);
  const { player } = useAuth();

  async function getMonkeynautSale() {
    try {
      const response = await baseApi.get('/sale-events/list-monkeynauts', {
        params: {
          sales: 'actived'
        }
      });

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
      const response = await baseApi.get('/sale-events/list-ships', {
        params: {
          sales: 'actived'
        }
      });

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
      const response = await baseApi.get('/sale-events/list-packs', {
        params: {
          sales: 'actived'
        }
      });

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

  async function verifyWallet() {
    const ethereum = (window as any).ethereum;

    if(typeof ethereum === 'undefined') {
      throw new Error("Activate ethereum in your browser");
    }

    const chainId = await ethereum.request({ method: 'eth_chainId' });

    if (chainId !== ethereumConfig.network.mainNetBSC) {
      throw new Error('You are in wrong network. Please connect to BSC Mainnet network.');
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts?.[0];

    if(!account) {
      throw new Error('You have not connected your metamask account.');
    }

    if(player && player.player.wallet) {
      const walletDifferent = account !== player?.player.wallet;

      if(walletDifferent) {
        throw new Error("Active metamask wallet is not the wallet that is linked in our system.");
      }
      return; 
    }

    throw new Error("You need to link your metamask first.");
  }

  async function handleSubmit(event: React.FormEvent, data: MonkeynautSale | ShipSale | PackSale) {
    event.preventDefault();

    try {
      await verifyWallet();

      const { error, transaction } = await paymentByEthereum({
        ethereum: (window as any).ethereum,
        toAddress: ethereumConfig.sendTransaction.toAddress,
        ether: ethers.utils.parseEther(String(data.price))._hex,
        dataContract: ethereumConfig.sendTransaction.contract[data.crypto],
      });
  
      if(error) {
        return toast(error.message, {
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
  
      const sale = {
        Monkeynaut: {
          monkeynautSaleId: data.id,
        },
        Ship: {
          shipSaleId: data.id,
        },
        Pack: {
          packSaleId: data.id,
        },
      }
  
      const dataPost = {
        wallet: player?.player.wallet,
        txHash: transaction,
        ...sale[data.saleType]
      }
      
      await baseApi.post('/sale-events/buy-sale-item', dataPost);

      toast(`Successfully ${data.saleType} sale`, {
        autoClose: 5000,
        pauseOnHover: true,
        type: 'success',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.black_0,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });

    } catch (error: any) {
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
        {sales?.monkeynauts && sales.monkeynauts.map(sale => (
          <Card onSubmit={(event) => handleSubmit(event, sale)} key={sale.id}>
            <CardContainer>
              <h1 className="card_title">{sale.saleType}</h1>
              <CardContent>
                <p className="description">
                  Includes: <br />
                  1 {sale.saleType} <br />
                  <br />
                  Probability: <br />
                  Private: {sale.private}% <br />
                  Seargeant: {sale.sergeant}% <br />
                  Captain: {sale.captain}% <br />
                  Major: {sale.major}% <br />
                <br />
                  {sale.endDate && (
                    <>
                      Expires In: <br />
                      {getFormattedDate(sale.endDate)} <br />
                    </>
                  )}
                </p>
                <img src={'/founderPack/monkeynauts.png'} />
                <span className="price">Price {sale.price} ${sale.crypto}</span>
                <span className="more_info_text">Hover mouse for more info</span>
                <Button 
                  text="BUY PACK" 
                  type="submit"
                  className="buy_pack"
                />
              </CardContent>
            </CardContainer>
            <span className="stock">{sale.currentQuantityAvailable}/{sale.quantity} Available</span>
          </Card>
        ))}

        {sales?.ships && sales.ships.map(sale => (
          <Card onSubmit={(event) => handleSubmit(event, sale)} key={sale.id}>
            <CardContainer>
              <h1 className="card_title">{sale.saleType}</h1>
              <CardContent>
                <p className="description">
                  Includes: <br />
                  1 {sale.saleType} <br />
                  <br />
                  Probability: <br />
                  Rank A: {sale.rank_a}% <br />
                  Rank B: {sale.rank_b}% <br />
                  Rank S: {sale.rank_s}% <br />
                  <br />
                  {sale.endDate && (
                    <>
                      Expires In: <br /> 
                      {getFormattedDate(sale.endDate)} <br />
                    </>
                  )}
                </p>

                <img src={'/founderPack/ships.png'} />
                <span className="price">Price {sale.price} ${sale.crypto}</span>
                <span className="more_info_text">Hover mouse for more info</span>
                <Button 
                  text="BUY PACK" 
                  type="submit"
                  className="buy_pack"
                />
              </CardContent>
            </CardContainer>
            <span className="stock">{sale.currentQuantityAvailable}/{sale.quantity} Available</span>
          </Card>
        ))}

        {sales?.packs && sales.packs.map(sale => (
          <Card onSubmit={(event) => handleSubmit(event, sale)} key={sale.id}>
            <CardContainer>
              <h1 className="card_title">{sale.saleType} - {sale.type}</h1>
              <CardContent>
                <p className="description">
                  Includes: 
                  <br /> <br />
                  {sale.type === 'BASIC' && (
                    <>
                      2 Monkeynauts - Rank Sergeant <br /><br />
                      1 Ship - Rank B <br /><br />
                      Classes are random 
                      <br/>
                    </>
                  )}
                  {sale.type === 'ADVANCED' && (
                    <>
                      3 Monkeynauts - Rank Captain <br /><br />
                      1 Ship - Rank A<br /><br />
                      Classes are random 
                      <br/>
                    </>
                  )}
                  {sale.type === 'EXPERT' && (
                    <>
                      4 Monkeynauts - Rank Major <br /><br />
                      1 Ship - Rank S<br /><br />
                      Classes are random 
                      <br/>
                    </>
                  )}
                  {sale.type === 'RANDOM' && (
                    <>
                      2 Monkeynauts random <br /><br />
                      1 Ship random<br /><br />
                      Classes are random 
                      <br/>
                    </>
                  )}
                  <br />
                  {sale.endDate && (
                    <>
                      Expires In: <br />
                      {getFormattedDate(sale.endDate)} <br />
                    </>
                  )}
                </p>

                <img src={notfound} />
                <span className="price">Price {sale.price} ${sale.crypto}</span>
                <span className="more_info_text">Hover mouse for more info</span>
                <Button 
                  text="BUY PACK" 
                  type="submit"
                  className="buy_pack"
                />
              </CardContent>
            </CardContainer>
            <span className="stock">{sale.currentQuantityAvailable}/{sale.quantity} Available</span>
          </Card>
        ))}
      </Content>
    </Container>
  );
}