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

import { useEffect, useState } from 'react';
import { baseApi } from '@/services/api';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { useAuth } from '@/hooks';
import { ethers } from 'ethers';
import { ApiError } from '@/utils/apiError';
import { verifyWallet } from '@/utils/wallet';

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
  rankA: number;
  rankB: number;
  rankS: number;
};

type PackSale = CommonSaleProps & {
  type: 'Basic' | 'Advanced' | 'Expert' | 'Random';
};

type Sales = {
  monkeynauts: MonkeynautSale[];
  ships: ShipSale[];
  packs: PackSale[];
}

export function StoreTab() {
  const [sales, setSales] = useState<Sales>({} as Sales);
  const { player } = useAuth();

  async function getMonkeynautSale() {
    const response = await baseApi.get('/sale-events/list-monkeynauts', {
      params: {
        sales: 'actived'
      }
    });

    setSales(prevState => {
      return {
        ...prevState,
        monkeynauts: response.data.data,
      }
    })
  }

  async function getShipSale() {
    const response = await baseApi.get('/sale-events/list-ships', {
      params: {
        sales: 'actived'
      }
    });

    setSales(prevState => {
      return {
        ...prevState,
        ships: response.data.data,
      }
    });
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
          packs: response.data.data,
        }
      })
    } catch (error: any) {
    }
  }

  async function getSalesEvent() {
    await getMonkeynautSale();
    await getShipSale()
    await getPackSale()
  }

  async function handleSubmit(event: React.FormEvent, data: MonkeynautSale | ShipSale | PackSale) {
    event.preventDefault();

    try {
      if(player) {
        await verifyWallet(player.player);
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
        ...sale[data.saleType]
      }

      const canBuySaleItem = await baseApi.post('/sale-events/can-buy-sale-item', dataPost);

      if(!canBuySaleItem.data.data.canBuySaleItem) {
        return toast(canBuySaleItem.data.reason, {
          autoClose: 7000,
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

      toast(`${player?.player.nickname}, please wait for the metamask window to open.`, {
        autoClose: 7000,
        pauseOnHover: true,
        type: 'info',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.black_0,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });
      
      toast(`if it doesn't open a popup, check your metamask`, {
        autoClose: 9000,
        pauseOnHover: true,
        type: 'info',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.black_0,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });

      const { error, transaction } = await paymentByEthereum({
        ethereum: (window as any).ethereum,
        toAddress: ethereumConfig.sendTransaction.toAddress,
        ether: ethers.utils.parseEther(String(data.price))._hex,
        dataContract: ethereumConfig.sendTransaction.contract[data.crypto],
      });

      if(error.message) {
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
      
      try {
        if(transaction) {
          toast(`Wait for the transaction to be confirmed in our database`, {
            autoClose: 9000,
            pauseOnHover: true,
            type: 'info',
            style: {
              background: COLORS.global.white_0,
              color: COLORS.global.black_0,
              fontSize: 14,
              fontFamily: 'Orbitron, sans-serif',
            }
          });

          await baseApi.post('/sale-events/buy-sale-item', {
            ...dataPost,
            txHash: transaction
          });

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
        }
      } catch (error: any) {
        const apiError = ApiError(error);

        apiError.messages.forEach(message => {
          toast(message, {
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
        });
      }
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
        {sales?.monkeynauts?.length === 0 && sales?.ships?.length === 0 && sales?.packs?.length === 0 && (
          <div className="texts_container">
            <p className="text" 
              style={{
                fontSize: '1.8rem'
              }}
            >There are currently no products in the store</p>
          </div>
        )}
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
                  Rank A: {sale.rankA}% <br />
                  Rank B: {sale.rankB}% <br />
                  Rank S: {sale.rankS}% <br />
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
                  {sale.type === 'Basic' && (
                    <>
                      2 Monkeynauts - Rank Sergeant <br /><br />
                      1 Ship - Rank B <br /><br />
                      Classes are random 
                      <br/>
                    </>
                  )}
                  {sale.type === 'Advanced' && (
                    <>
                      3 Monkeynauts - Rank Captain <br /><br />
                      1 Ship - Rank A<br /><br />
                      Classes are random 
                      <br/>
                    </>
                  )}
                  {sale.type === 'Expert' && (
                    <>
                      4 Monkeynauts - Rank Major <br /><br />
                      1 Ship - Rank S<br /><br />
                      Classes are random 
                      <br/>
                    </>
                  )}
                  {sale.type === 'Random' && (
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

                <img src={'/founderPack/pack.png'} />
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