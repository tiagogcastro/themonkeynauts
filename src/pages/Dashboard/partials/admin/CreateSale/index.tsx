import { Button, Input } from '@/components';
import { InputSelect } from '@/components/HTML/InputSelect';
import { useAuth } from '@/hooks';
import { getValidationErrors } from '@/utils';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import * as Yup from 'yup';

import * as S from './styles';

export type HandleChange = {
  event: React.ChangeEvent<HTMLInputElement>;
}

const schema = Yup.object().shape({
  type: Yup.string()
    .required('This field is required'),
  crypto: Yup.string()
    .required('This field is required'),
  price: Yup.number()
    .min(1, 'Min quantity is 1')
    .required('This field is required'),
  start_date: Yup.string()
    .required('This field is required'),
  end_date: Yup.string()
    .required('This field is required'),
  quantity: Yup.number()
    .min(1, 'Min quantity is 1')
    .required('This field is required'),
  private: Yup.number()
    .required('This field is required'),
  sergeant: Yup.number()
    .required('This field is required'),
  captain: Yup.number()
    .required('This field is required'),
  major: Yup.number()
    .required('This field is required'),
});

export function AdminCreateSale() {
  const { player } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const types = [
    {
      value: 'monkeynaut',
      label: 'Monkeynaut'
    },
    {
      value: 'spaceship',
      label: 'Spaceship'
    },
    {
      value: 'pack',
      label: 'Pack'
    },
  ];

  async function createSale(data: any) {
    const {
      price,
      private: privateData,
      quantity,
      sergeant,
      captain,
      major,
    } = data;
    
    const dataFormatted = {
      ...data,
      price: Number(price),
      private: Number(privateData),
      quantity: Number(quantity),
      sergeant: Number(sergeant),
      captain: Number(captain),
      major: Number(major),
    }

    try {
      await schema.validate(dataFormatted, {
        abortEarly: false
      });

      console.log(dataFormatted);
    } catch (error: any) {
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        return formRef.current?.setErrors(errors);
      }
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
              fields={types}
            />
            <InputSelect 
              name='crypto'
              labelText='Crypto' 
              fields={types}
            />
            <Input 
              name="price"
              type="number"
              labelText='Price'
            />
            <Input 
              name="start_date"
              type="date"
              labelText='Start Date'
            />
            <Input 
              name="end_date"
              type="date"
              labelText='End Date'
            />
            <Input 
              name="quantity"
              type="number"
              labelText='Quantity'
            />
            <Input 
              name="private"
              type="number"
              labelText='Private (%)'
            />
            <Input 
              name="sergeant"
              type="number"
              labelText='Sergeant (%)'
            />
            <Input 
              name="captain"
              type="number"
              labelText='Captain (%)'
            />
            <Input 
              name="major"
              type="number"
              labelText='Major (%)'
            />
            <Input 
              name="buy_limit"
              type="number"
              labelText='Buy limit'
            />
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