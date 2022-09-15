import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { AiOutlineStop } from 'react-icons/ai';
import { FormHandles } from '@unform/core';

import { getValidationErrors } from '@/utils';

import { Button, Input } from '@/components';
import { InputSelect } from '@/components/HTML/InputSelect';

import * as S from './styles';
import { baseApi } from '@/services/api';
import { toast } from 'react-toastify';
import { COLORS } from '@/theme';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { ApiError } from '@/utils/apiError';

const schema = Yup.object().shape({
  type: Yup.string()
    .required('This field is required'),
  crypto: Yup.string()
    .required('This field is required'),
  price: Yup.number()
    .min(0.000001, 'Min quantity is 0.000001')
    .required('This field is required'),
  startDate: Yup.string()
    .required('This field is required'),
  endDate: Yup.string(),
  quantity: Yup.number()
    .min(1, 'Min quantity is 1')
    .required('This field is required'),

  saleMonkeynaut: Yup.object().when('type', {
    is: (value: any) => value === 'Monkeynaut',
    then: Yup.object({
      private: Yup.number()
      .required('This field is required')
      .min(0.01, 'Value min is 0.001'),
      sergeant: Yup.number()
        .required('This field is required')
        .min(0.01, 'Value min is 0.001'),
      captain: Yup.number()
        .required('This field is required')
        .min(0.01, 'Value min is 0.001'),
      major: Yup.number()
        .required('This field is required')
        .min(0.01, 'Value min is 0.001'),
    })
  }),

  saleShip: Yup.object().when('type', {
    is: (value: any) => value === 'Ship',
    then: Yup.object({
      rankA: Yup.number()
      .required('This field is required')
      .min(0.01, 'Value min is 0.001'),
      rankB: Yup.number()
        .required('This field is required')
        .min(0.01, 'Value min is 0.001'),
      rankS: Yup.number()
        .required('This field is required')
        .min(0.01, 'Value min is 0.001'),
    })
  }),

  salePack: Yup.object().when('type', {
    is: (value: any) => value === 'Pack',
    then: Yup.object({
      type: Yup.string()
      .required('This field is required')
    })
  })
});

type CreateSale = {
  price: number;
  quantity: number;
  startDate: string;
  endDate: string;
  crypto: 'BNB' | 'BUSD' | 'SPC';
  type: 'Monkeynaut' | 'Ship' | 'Pack';
  saleMonkeynaut?: MonkeynautSale;
  saleShip?: ShipSale;
  salePack?: PackSale;
}

const types = [
  {
    value: 'Monkeynaut',
    label: 'Monkeynaut'
  },
  {
    value: 'Ship',
    label: 'Spaceship'
  },
  {
    value: 'Pack',
    label: 'Pack'
  },
];

const cryptoTypes = [
  {
    value: 'BNB',
    label: 'BNB'
  },
  {
    value: 'BUSD',
    label: 'BUSD'
  },
  {
    value: 'SPC',
    label: 'SPC'
  },
];

const packType = [
  {
    value: 'Basic',
    label: 'Basic'
  },
  {
    value: 'Advanced',
    label: 'Advanced'
  },
  {
    value: 'Ex',
    label: 'Expert'
  },
  {
    value: 'Random',
    label: 'Random'
  },
]

type SaleType = 'Monkeynaut' | 'Ship' | 'Pack';

type CommonSaleProps = {
  id: string;
  crypto: 'BNB' | 'BUSD' | 'SPC';
  saleType: SaleType;
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

export function AdminCreateSale() {
  const formRef = useRef<FormHandles>(null);

  const [currentType, setCurrentType] = useState('');

  const [openSales, setOpenSales] = useState<Sales>({} as Sales);
  const [lastSales, setLastSales] = useState<Sales>({} as Sales);

  async function getOpenMonkeynautSale() {
    const response = await baseApi.get('/sale-events/list-monkeynauts', {
      params: {
        sales: 'actived'
      }
    });

    setOpenSales(prevState => {
      return {
        ...prevState,
        monkeynauts: response.data.data,
      }
    })
  }

  async function getOpenShipSale() {
    const response = await baseApi.get('/sale-events/list-ships', {
      params: {
        sales: 'actived'
      }
    });

    setOpenSales(prevState => {
      return {
        ...prevState,
        ships: response.data.data,
      }
    });
  }

  async function getOpenPackSale() {
    const response = await baseApi.get('/sale-events/list-packs', {
      params: {
        sales: 'actived'
      }
    });

    setOpenSales(prevState => {
      return {
        ...prevState,
        packs: response.data.data,
      }
    })
  }

  async function getLastMonkeynautSale() {
    const response = await baseApi.get('/sale-events/list-monkeynauts', {
      params: {
        sales: 'notActived'
      }
    });

    setLastSales(prevState => {
      return {
        ...prevState,
        monkeynauts: response.data.data,
      }
    })

  }

  async function getLastShipSale() {
    const response = await baseApi.get('/sale-events/list-ships', {
      params: {
        sales: 'notActived'
      }
    });

    setLastSales(prevState => {
      return {
        ...prevState,
        ships: response.data.data,
      }
    });
  }

  async function getLastPackSale() {
    const response = await baseApi.get('/sale-events/list-packs', {
      params: {
        sales: 'notActived'
      }
    });

    setLastSales(prevState => {
      return {
        ...prevState,
        packs: response.data.data,
      }
    })
  }

  async function getOpenSales() {
    await getOpenMonkeynautSale();
    await getOpenShipSale()
    await getOpenPackSale()
  }

  async function getLastSales() {
    await getLastMonkeynautSale();
    await getLastShipSale()
    await getLastPackSale()
  }

  useEffect(() => {
    getOpenSales()
    getLastSales()
  }, []);

  async function createSale(data: CreateSale, rest: any) {
    const {
      price,
      quantity,
      saleMonkeynaut,
      saleShip,
      salePack,
      endDate,
      startDate,
      type,
      crypto
    } = data;
    
    let dataCommon = {};

    switch (data.type) {
      case 'Monkeynaut':
        dataCommon = {
          ...dataCommon,
          saleMonkeynaut: {
            private: Number(saleMonkeynaut?.private),
            sergeant: Number(saleMonkeynaut?.sergeant),
            captain: Number(saleMonkeynaut?.captain),
            major: Number(saleMonkeynaut?.major),
          }
        }
        break;
      case 'Ship':
        dataCommon = {
          ...dataCommon,
          saleShip: {
            rankB: Number(saleShip?.rankB),
            rankA: Number(saleShip?.rankA),
            rankS: Number(saleShip?.rankS),
          },
        }
        break;
      case 'Pack':
        dataCommon = {
          ...dataCommon,
          salePack: {
            type: salePack?.type
          },
        }
        break;
      default:
        break;
    }

    const currentHour = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

    const _startDate = new Date(`${startDate} ${currentHour}`);
    const _endDate = new Date(`${endDate} ${currentHour}`);

    const dataFormatted = {
      startDate: _startDate,
      type,
      crypto,
      price: Number(price),
      quantity: Number(quantity),
      ...dataCommon
    }

    const postData = endDate ? {
      ...dataFormatted,
      endDate: _endDate,
    } : dataFormatted;

    try {
      await schema.validate(postData, {
        abortEarly: false
      });

      await baseApi.post('/admins/sale-events/create', postData);

      const executeGetOpenSaleByType = {
        Monkeynaut: getOpenMonkeynautSale,
        Ship: getOpenShipSale,
        Pack: getOpenPackSale,
      };

      const executeLastOpenSaleByType = {
        Monkeynaut: getLastMonkeynautSale,
        Ship: getLastShipSale,
        Pack: getLastPackSale,
      };

      executeGetOpenSaleByType[type]();
      executeLastOpenSaleByType[type]();

      rest.reset();

      toast(`Sale created successfully`, {
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
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        return formRef.current?.setErrors(errors);
      }

      const apiErrorResponse = ApiError(error);

      apiErrorResponse.messages.map(message => {
        return toast(message, {
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
  }

  async function stopSale(sale: MonkeynautSale | ShipSale | PackSale) {
    try {
      const saleDataUnique = {
        Monkeynaut: {
          saleMonkeynaut: {
            saleMonkeynautId: sale.id,
          }
        },
        Ship: {
          saleShip: {
            saleShipId: sale.id,
          }
        },
        Pack: {
          salePack: {
            salePackId: sale.id,
          }
        },
      }

      const _type = sale.saleType as SaleType;

      await baseApi.put('/admins/sale-events/update-sale', {
        type: _type,
        active: false,
        ...saleDataUnique[_type],
      });
      
      const executeGetOpenSaleByType = {
        Monkeynaut: getOpenMonkeynautSale,
        Ship: getOpenShipSale,
        Pack: getOpenPackSale,
      };

      const executeGetLastSaleByType = {
        Monkeynaut: getLastMonkeynautSale,
        Ship: getLastShipSale,
        Pack: getLastPackSale,
      };

      executeGetOpenSaleByType[_type]()
      executeGetLastSaleByType[_type]()

      toast(`Sale stopped successfully`, {
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
      const apiErrorResponse = ApiError(error);

      apiErrorResponse.messages.map(message => {
        return toast(message, {
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
  }

  return (
    <S.Container>
      <S.Content>
        <S.MainContent>

          <S.FormContainer ref={formRef} onSubmit={createSale}>
            <h1>Create a new sales event</h1>
            <InputSelect 
              name='type' 
              labelText='Type'
              onChange={(e: any) => e && setCurrentType(e.value)}
              fields={types}
            />
            <InputSelect 
              name='crypto'
              labelText='Crypto' 
              fields={cryptoTypes}
            />
            <Input 
              name="price"
              type="text"
              labelText='Price'
            />
            <Input 
              name="startDate"
              type="date"
              labelText='Start Date'
            />
            <Input 
              name="endDate"
              type="date"
              labelText='End Date'
            />
            <Input 
              name="quantity"
              type="number"
              labelText='Quantity'
            />
            {currentType === 'Monkeynaut' && (
              <>
                <Input 
                  name="saleMonkeynaut.private"
                  type="number"
                  labelText='Private (%)'
                />
                <Input 
                  name="saleMonkeynaut.sergeant"
                  type="number"
                  labelText='Sargeant (%)'
                />
                <Input 
                  name="saleMonkeynaut.captain"
                  type="number"
                  labelText='Captain (%)'
                />
                <Input 
                  name="saleMonkeynaut.major"
                  type="number"
                  labelText='Major (%)'
                />
              </>
            )}

            {currentType === 'Ship' && (
              <>
                <Input 
                  name="saleShip.rankA"
                  type="number"
                  labelText='Rank A (%)'
                />
                <Input 
                  name="saleShip.rankB"
                  type="number"
                  labelText='Rank B (%)'
                />
                <Input 
                  name="saleShip.rankS"
                  type="number"
                  labelText='Rank S (%)'
                />
              </>
            )}

            {currentType === 'Pack' && (
              <>
                <InputSelect 
                  name='salePack.type'
                  labelText='Pack type' 
                  fields={packType}
                />
              </>
            )}
            
            {/* <Input 
              name="buy_limit"
              type="number"
              labelText='Buy limit'
            /> */}
            <Button text="Create" type="submit" />
          </S.FormContainer>

          <S.OpenSalesContainer>
            <h1>Open Sales</h1>
            <div className="opensales_content">
              <S.TableCustom>
                <thead>
                  <tr>
                    <S.TdCustom>Type</S.TdCustom>
                    <S.TdCustom>Units. Sold</S.TdCustom>
                    <S.TdCustom>Quantity</S.TdCustom>
                    <S.TdCustom>Stop</S.TdCustom>
                  </tr>
                </thead>
                <tbody>
                  {openSales?.monkeynauts && openSales.monkeynauts.map((sale) => (
                    <tr key={sale.id}>
                      <S.TdCustom>{sale.saleType}</S.TdCustom>
                      <S.TdCustom>{sale.totalUnitsSold}</S.TdCustom>
                      <S.TdCustom>{sale.quantity}</S.TdCustom>
                      <S.TdCustom className="stop">
                        <button
                          type="button"
                          title="Disable Sale"
                          onClick={() => stopSale(sale)}
                        >
                          <AiOutlineStop />
                        </button>
                      </S.TdCustom>
                    </tr>
                  ))}
                  {openSales?.ships && openSales.ships.map((sale) => (
                    <tr key={sale.id}>
                      <S.TdCustom>{sale.saleType}</S.TdCustom>
                      <S.TdCustom>{sale.totalUnitsSold}</S.TdCustom>
                      <S.TdCustom>{sale.quantity}</S.TdCustom>
                      <S.TdCustom className="stop">
                        <button
                          type="button"
                          title="Disable Sale"
                          onClick={() => stopSale(sale)}
                        >
                          <AiOutlineStop />
                        </button>
                      </S.TdCustom>
                    </tr>
                  ))}
                  {openSales?.packs && openSales.packs.map((sale) => (
                    <tr key={sale.id}>
                      <S.TdCustom>{sale.saleType}</S.TdCustom>
                      <S.TdCustom>{sale.totalUnitsSold}</S.TdCustom>
                      <S.TdCustom>{sale.quantity}</S.TdCustom>
                      <S.TdCustom className="stop">
                        <button
                          type="button"
                          title="Disable Sale"
                          onClick={() => stopSale(sale)}
                        >
                          <AiOutlineStop />
                        </button>
                      </S.TdCustom>
                    </tr>
                  ))}
                  
                </tbody>
              </S.TableCustom>
            </div>
          </S.OpenSalesContainer>

        </S.MainContent>
        <S.LastSalesContainer>
          <h1>Last Sales</h1>
            <div className="lastsales_content">
              <S.TableCustom>
                <thead>
                  <tr>
                    <S.TdCustom>Type</S.TdCustom>
                    <S.TdCustom>Crypto</S.TdCustom>
                    <S.TdCustom>Start Date</S.TdCustom>
                    <S.TdCustom>End Date</S.TdCustom>
                    <S.TdCustom>Units. Sold</S.TdCustom>
                  </tr>
                </thead>
                <tbody>
                  {lastSales.monkeynauts && lastSales.monkeynauts.map(sale => (
                    <tr key={sale.id}>
                      <S.TdCustom>{sale.saleType}</S.TdCustom>
                      <S.TdCustom>{sale.crypto}</S.TdCustom>
                      <S.TdCustom>{getFormattedDate(sale.startDate)}</S.TdCustom>
                      <S.TdCustom>{sale.endDate ? getFormattedDate(sale.endDate) : 'Undefined'}</S.TdCustom>
                      <S.TdCustom>{sale.currentQuantityAvailable}/{sale.quantity}</S.TdCustom>
                    </tr>
                  ))}
                  {lastSales.ships && lastSales.ships.map(sale => (
                    <tr key={sale.id}>
                      <S.TdCustom>{sale.saleType}</S.TdCustom>
                      <S.TdCustom>{sale.crypto}</S.TdCustom>
                      <S.TdCustom>{getFormattedDate(sale.startDate)}</S.TdCustom>
                      <S.TdCustom>{sale.endDate ? getFormattedDate(sale.endDate) : 'Undefined'}</S.TdCustom>
                      <S.TdCustom>{sale.currentQuantityAvailable}/{sale.quantity}</S.TdCustom>
                    </tr>
                  ))}
                  {lastSales.packs && lastSales.packs.map(sale => (
                    <tr key={sale.id}>
                      <S.TdCustom>{sale.saleType}</S.TdCustom>
                      <S.TdCustom>{sale.crypto}</S.TdCustom>
                      <S.TdCustom>{getFormattedDate(sale.startDate)}</S.TdCustom>
                      <S.TdCustom>{sale.endDate ? getFormattedDate(sale.endDate) : 'Undefined'}</S.TdCustom>
                      <S.TdCustom>{sale.currentQuantityAvailable}/{sale.quantity}</S.TdCustom>
                    </tr>
                  ))}
                </tbody>
              </S.TableCustom>
            </div>
        </S.LastSalesContainer>
      </S.Content>
    </S.Container>
  );
}