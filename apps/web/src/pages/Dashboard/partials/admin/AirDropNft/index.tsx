import { Button, Input } from '@/components';
import { InputSelect } from '@/components/HTML/InputSelect';
import { baseApi } from '@/services/api';
import { COLORS } from '@/theme';
import { getValidationErrors } from '@/utils';
import { ApiError } from '@/utils/apiError';
import { FormHandles } from '@unform/core';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import * as S from './styles';

type AirDropType = 'Monkeynaut' | 'Ship' | 'Pack';

type CommonAirDropFields<Rank, Class> = {
  rank: Rank;
  class: Class;
}

type MonkeynautRanks = 'Private' | 'Sergeant' | 'Captain' | 'Major';
type ShipRanks = 'A' | 'B' |'S';

type AirDropData = {
  type: AirDropType;
  email: string;
  Monkeynaut?: {
    rank: CommonAirDropFields<MonkeynautRanks | 'Random', 'Random'>;
    class: 'Random';
  };
  Ship?: {
    rank: CommonAirDropFields<ShipRanks | 'Random', 'Random'>;
    class: 'Random';
  };
}

const createNftDropSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('This field is required'),
  type: Yup.string()
    .required('This field is required'),
  monkeynaut: Yup.object().when('type', {
    is: (value: any) => value === 'Monkeynaut',
    then: Yup.object({
      role: Yup.string()
        .required('This field is required'),
      rank: Yup.string()
        .required('This field is required'),
    })
  }),
  ship: Yup.object().when('type', {
    is: (value: any) => value === 'Ship',
    then: Yup.object({
      role: Yup.string()
        .required('This field is required'),
      rank: Yup.string()
        .required('This field is required'),
    })
  }),
});

const roleFields = {
  Monkeynaut: [
    {
      value: 'Random',
      label: 'Random'
    },
  ],
  Ship: [
    {
      value: 'Random',
      label: 'Random'
    },
  ],
  Pack: []
};

const ranksFields = {
  Monkeynaut: [
    {
      value: 'Private',
      label: 'Private'
    },
    {
      value: 'Sergeant',
      label: 'Sergeant'
    },
    {
      value: 'Captain',
      label: 'Captain'
    },
    {
      value: 'Major',
      label: 'Major'
    },
    {
      value: 'Random',
      label: 'Random'
    },
  ],
  Ship: [
    {
      value: 'B',
      label: 'B'
    },
    {
      value: 'S',
      label: 'A'
    },
    {
      value: 'S',
      label: 'S'
    },
    {
      value: 'Random',
      label: 'Random'
    },
  ],
  Pack: []
};

const types = [
  {
    value: 'Monkeynaut',
    label: 'Monkeynaut'
  },
  {
    value: 'Ship',
    label: 'Ship'
  },
  {
    value: 'Pack',
    label: 'Pack'
  },
];

export function AdminAirDropNft() {
  const formRef = useRef<FormHandles>(null);

  const [currentType, setCurrentType] = useState<AirDropType | null>(null);

  async function createNftDrop(data: AirDropData) {
    try {
      await createNftDropSchema.validate(data, {
        abortEarly: false
      });

      await baseApi.post('/admins/sale-events/create-air-drop-nft', data);

      toast(`Sent successfully Air Drop NFT to ${data.email}`, {
        autoClose: 7000,
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

      const apiErrors = ApiError(error);

      apiErrors.messages.forEach((message) => {
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
      })
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.MainContent>
          <S.FormContainer ref={formRef} onSubmit={createNftDrop  }>
            <h1>Air drop NFT</h1>
            <Input
              name='email' 
              labelText='E-mail' 
            />
            <InputSelect
              name='type'
              labelText='Type'
              onChange={(e: any) => setCurrentType(e.value)}
              fields={types}
            />
            {currentType === 'Monkeynaut' && (
              <>
                <InputSelect
                  name={`${currentType?.toLowerCase()}.role`}
                  labelText='Role'
                  fields={currentType ? roleFields[currentType] : []}
                />
                <InputSelect
                  name={`${currentType?.toLowerCase()}.rank`}
                  labelText='Rank' 
                  fields={currentType ? ranksFields[currentType] : []}
                />
              </>
            )}
            {currentType === 'Ship' && (
              <>
                <InputSelect
                  name={`${currentType?.toLowerCase()}.role`}
                  labelText='Role'
                  fields={currentType ? roleFields[currentType] : []}
                />
                <InputSelect
                  name={`${currentType?.toLowerCase()}.rank`}
                  labelText='Rank' 
                  fields={currentType ? ranksFields[currentType] : []}
                />
              </>
            )}
            <Button text="Send" type="submit" />
          </S.FormContainer>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}