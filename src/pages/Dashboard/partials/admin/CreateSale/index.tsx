import { useRef, useState } from 'react';
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

const schema = Yup.object().shape({
  type: Yup.string()
    .required('This field is required'),
  crypto: Yup.string()
    .required('This field is required'),
  price: Yup.number()
    .min(1, 'Min quantity is 1')
    .required('This field is required'),
  startDate: Yup.string()
    .required('This field is required'),
  endDate: Yup.string(),
  quantity: Yup.number()
    .min(1, 'Min quantity is 1')
    .required('This field is required'),

  saleMonkeynaut: Yup.object().when('type', {
    is: (value: any) => value === 'MONKEYNAUT',
    then: Yup.object({
      private: Yup.number()
      .required('This field is required')
      .min(0.01, 'Value min is 0.001'),
      sargeant: Yup.number()
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
    is: (value: any) => value === 'SHIP',
    then: Yup.object({
      rank_a: Yup.number()
      .required('This field is required')
      .min(0.01, 'Value min is 0.001'),
      rank_b: Yup.number()
        .required('This field is required')
        .min(0.01, 'Value min is 0.001'),
      rank_s: Yup.number()
        .required('This field is required')
        .min(0.01, 'Value min is 0.001'),
    })
  }),

  salePack: Yup.object().when('type', {
    is: (value: any) => value === 'PACK',
    then: Yup.object({
      basic: Yup.number()
      .required('This field is required')
      .min(0.01, 'Value min is 0.001'),
      advanced: Yup.number()
        .required('This field is required')
        .min(0.01, 'Value min is 0.001'),
      expert: Yup.number()
        .required('This field is required')
        .min(0.01, 'Value min is 0.001'),
    })
  })
});

type MonkeynautSale = {
  private: number;
  sargeant: number;
  captain: number;
  major: number;
}

type ShipSale = {
  rank_a: number;
  rank_b: number;
  rank_s: number;
}

type PackSale = {
  basic: number;
  advanced: number;
  expert: number;
}

type CreateSale = {
  price: number;
  quantity: number;
  startDate: string;
  endDate: string;
  crypto: 'BNB' | 'BUSD' | 'SPC';
  type: 'MONKEYNAUT' | 'SHIP' | 'PACK';
  saleMonkeynaut?: MonkeynautSale;
  saleShip?: ShipSale;
  salePack?: PackSale;
}

const types = [
  {
    value: 'MONKEYNAUT',
    label: 'Monkeynaut'
  },
  {
    value: 'SHIP',
    label: 'Spaceship'
  },
  {
    value: 'PACK',
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

export function AdminCreateSale() {
  const formRef = useRef<FormHandles>(null);

  const [currentType, setCurrentType] = useState('');

  async function createSale(data: CreateSale) {
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
      case 'MONKEYNAUT':
        dataCommon = {
          ...dataCommon,
          saleMonkeynaut: {
            private: Number(saleMonkeynaut?.private),
            sargeant: Number(saleMonkeynaut?.sargeant),
            captain: Number(saleMonkeynaut?.captain),
            major: Number(saleMonkeynaut?.major),
          }
        }
        break;
      case 'SHIP':
        dataCommon = {
          ...dataCommon,
          saleShip: {
            rank_b: Number(saleShip?.rank_b),
            rank_a: Number(saleShip?.rank_a),
            rank_s: Number(saleShip?.rank_s),
          },
        }
        break;
      case 'PACK':
        dataCommon = {
          ...dataCommon,
          salePack: {
            basic: Number(salePack?.basic),
            advanced: Number(salePack?.advanced),
            expert: Number(salePack?.expert),
          },
        }
        break;
      default:
        break;
    }

    const currentDate = new Date();

    const hourDate = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    const dataFormatted = {
      startDate: `${startDate} ${hourDate}`,
      type,
      crypto,
      price: Number(price),
      quantity: Number(quantity),
      ...dataCommon
    }

    const postData = endDate ? {
      ...dataFormatted,
      endDate: `${endDate} ${hourDate}`,
    } : dataFormatted;

    try {
      await schema.validate(postData, {
        abortEarly: false
      });

      const response = await baseApi.post('/sale-events/create', postData);

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

      toast(error?.response?.data.message, {
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
    <S.Container>
      <S.Content>
        <S.MainContent>

          <S.FormContainer ref={formRef} onSubmit={createSale}>
            <h1>Create a new sales event</h1>
            <InputSelect 
              name='type' 
              labelText='Type'
              onChange={(e: any) => setCurrentType(e.value)}
              fields={types}
            />
            <InputSelect 
              name='crypto'
              labelText='Crypto' 
              fields={cryptoTypes}
            />
            <Input 
              name="price"
              type="number"
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
            {currentType === 'MONKEYNAUT' && (
              <>
                <Input 
                  name="saleMonkeynaut.private"
                  type="number"
                  labelText='Private (%)'
                />
                <Input 
                  name="saleMonkeynaut.sargeant"
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

            {currentType === 'SHIP' && (
              <>
                <Input 
                  name="saleShip.rank_a"
                  type="number"
                  labelText='Rank A (%)'
                />
                <Input 
                  name="saleShip.rank_b"
                  type="number"
                  labelText='Rank B (%)'
                />
                <Input 
                  name="saleShip.rank_s"
                  type="number"
                  labelText='Rank S (%)'
                />
              </>
            )}

            {currentType === 'PACK' && (
              <>
                <Input 
                  name="salePack.basic"
                  type="number"
                  labelText='Basic (%)'
                />
                <Input 
                  name="salePack.advanced"
                  type="number"
                  labelText='Advanced (%)'
                />
                <Input 
                  name="salePack.expert"
                  type="number"
                  labelText='Expert (%)'
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
                    <S.TdCustom>Offerred</S.TdCustom>
                    <S.TdCustom>Sold</S.TdCustom>
                    <S.TdCustom>Earning</S.TdCustom>
                    <S.TdCustom>Stop</S.TdCustom>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom className="stop">
                      <button
                        type="button"
                      >
                        <AiOutlineStop />
                      </button>
                    </S.TdCustom>
                  </tr>
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
                    <S.TdCustom>Start</S.TdCustom>
                    <S.TdCustom>End</S.TdCustom>
                    <S.TdCustom>Crypto</S.TdCustom>
                    <S.TdCustom>Chests Offered</S.TdCustom>
                    <S.TdCustom>Chests Sold</S.TdCustom>
                    <S.TdCustom>Chests Price</S.TdCustom>
                    <S.TdCustom>$ Total</S.TdCustom>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                    <S.TdCustom>text</S.TdCustom>
                  </tr>
                </tbody>
              </S.TableCustom>
            </div>
        </S.LastSalesContainer>
      </S.Content>
    </S.Container>
  );
}