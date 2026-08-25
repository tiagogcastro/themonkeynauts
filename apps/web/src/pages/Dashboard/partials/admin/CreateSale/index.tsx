import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { AiOutlineStop } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '@/components';
import { InputSelect } from '@/components/HTML/InputSelect';
import * as S from './styles';
import { baseApi } from '@/services/api';
import { toast } from 'react-toastify';
import { COLORS } from '@/theme';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { ApiError } from '@/utils/apiError';

const numberField = (min: number) => Yup.number()
  .transform((value, originalValue) => (originalValue === '' ? undefined : value))
  .typeError('Enter a valid number')
  .min(min, `Min quantity is ${min}`)
  .required('This field is required');

const schema = Yup.object().shape({
  type: Yup.string()
    .required('This field is required'),
  crypto: Yup.string()
    .required('This field is required'),
  price: numberField(0.000001),
  startDate: Yup.string()
    .required('This field is required'),
  endDate: Yup.string(),
  quantity: numberField(1),

  saleMonkeynaut: Yup.object().when('type', ([type], schema) =>
    type === 'Monkeynaut'
      ? schema.shape({
          private: numberField(0.01),
          sergeant: numberField(0.01),
          captain: numberField(0.01),
          major: numberField(0.01),
        })
      : schema.notRequired(),
  ),

  saleShip: Yup.object().when('type', ([type], schema) =>
    type === 'Ship'
      ? schema.shape({
          rankA: numberField(0.01),
          rankB: numberField(0.01),
          rankS: numberField(0.01),
        })
      : schema.notRequired(),
  ),

  salePack: Yup.object().when('type', ([type], schema) =>
    type === 'Pack'
      ? schema.shape({
          type: Yup.string().required('This field is required'),
        })
      : schema.notRequired(),
  ),
});

type CreateSaleFormData = {
  crypto: 'BNB' | 'BUSD' | 'SPC';
  type: 'Monkeynaut' | 'Ship' | 'Pack';
  price: number | string;
  quantity: number | string;
  startDate: string;
  endDate?: string;
  saleMonkeynaut?: {
    private: number | string;
    sergeant: number | string;
    captain: number | string;
    major: number | string;
  };
  saleShip?: {
    rankA: number | string;
    rankB: number | string;
    rankS: number | string;
  };
  salePack?: {
    type: 'Basic' | 'Advanced' | 'Expert' | 'Random';
  };
};

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
    value: 'Expert',
    label: 'Expert'
  },
  {
    value: 'Random',
    label: 'Random'
  },
];

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
};

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
};

export function AdminCreateSale() {
  const [openSales, setOpenSales] = useState<Sales>({} as Sales);
  const [lastSales, setLastSales] = useState<Sales>({} as Sales);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateSaleFormData>({
    resolver: yupResolver(schema) as never,
  });

  const currentType = watch('type');

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
    await getOpenShipSale();
    await getOpenPackSale();
  }

  async function getLastSales() {
    await getLastMonkeynautSale();
    await getLastShipSale();
    await getLastPackSale();
  }

  useEffect(() => {
    getOpenSales();
    getLastSales();
  }, []);

  async function createSale(data: CreateSaleFormData) {
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
    };

    const postData = endDate ? {
      ...dataFormatted,
      endDate: _endDate,
    } : dataFormatted;

    try {
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

      reset();

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
      };

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

      executeGetOpenSaleByType[_type]();
      executeGetLastSaleByType[_type]();

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

  const inputError = (path: keyof CreateSaleFormData | string): string | undefined => {
    const keys = path.split('.') as (keyof CreateSaleFormData)[];
    let node: any = errors;

    for (const key of keys) {
      if (!node) return undefined;
      node = node[key];
    }

    return node?.message;
  };

  return (
    <S.Container>
      <S.Content>
        <S.MainContent>

          <S.FormContainer onSubmit={handleSubmit(createSale)}>
            <h1>Create a new sales event</h1>
            <InputSelect
              labelText='Type'
              fields={types}
              error={inputError('type')}
              registration={register('type')}
            />
            <InputSelect
              labelText='Crypto'
              fields={cryptoTypes}
              error={inputError('crypto')}
              registration={register('crypto')}
            />
            <Input
              type="text"
              labelText='Price'
              error={inputError('price')}
              registration={register('price')}
            />
            <Input
              type="date"
              labelText='Start Date'
              error={inputError('startDate')}
              registration={register('startDate')}
            />
            <Input
              type="date"
              labelText='End Date'
              error={inputError('endDate')}
              registration={register('endDate')}
            />
            <Input
              type="number"
              labelText='Quantity'
              error={inputError('quantity')}
              registration={register('quantity')}
            />
            {currentType === 'Monkeynaut' && (
              <>
                <Input
                  type="number"
                  labelText='Private (%)'
                  error={inputError('saleMonkeynaut.private')}
                  registration={register('saleMonkeynaut.private')}
                />
                <Input
                  type="number"
                  labelText='Sargeant (%)'
                  error={inputError('saleMonkeynaut.sergeant')}
                  registration={register('saleMonkeynaut.sergeant')}
                />
                <Input
                  type="number"
                  labelText='Captain (%)'
                  error={inputError('saleMonkeynaut.captain')}
                  registration={register('saleMonkeynaut.captain')}
                />
                <Input
                  type="number"
                  labelText='Major (%)'
                  error={inputError('saleMonkeynaut.major')}
                  registration={register('saleMonkeynaut.major')}
                />
              </>
            )}

            {currentType === 'Ship' && (
              <>
                <Input
                  type="number"
                  labelText='Rank A (%)'
                  error={inputError('saleShip.rankA')}
                  registration={register('saleShip.rankA')}
                />
                <Input
                  type="number"
                  labelText='Rank B (%)'
                  error={inputError('saleShip.rankB')}
                  registration={register('saleShip.rankB')}
                />
                <Input
                  type="number"
                  labelText='Rank S (%)'
                  error={inputError('saleShip.rankS')}
                  registration={register('saleShip.rankS')}
                />
              </>
            )}

            {currentType === 'Pack' && (
              <>
                <InputSelect
                  labelText='Pack type'
                  fields={packType}
                  error={inputError('salePack.type')}
                  registration={register('salePack.type')}
                />
              </>
            )}
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
