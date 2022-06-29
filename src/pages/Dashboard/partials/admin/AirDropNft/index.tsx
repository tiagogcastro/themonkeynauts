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

type AirDropType = 'MONKEYNAUT' | 'SHIP' | 'PACK';

type CommonAirDropFields<Rank, Class> = {
  rank: Rank;
  class: Class;
}

type MonkeynautRanks = 'PRIVATE' | 'SERGEANT' | 'CAPTAIN' | 'MAJOR';
type ShipRanks = 'A' | 'B' |'S';

type AirDropData = {
  type: AirDropType;
  email: string;
  monkeynaut?: {
    rank: CommonAirDropFields<MonkeynautRanks | 'RANDOM', 'RANDOM'>;
    class: 'RANDOM';
  };
  ship?: {
    rank: CommonAirDropFields<ShipRanks | 'RANDOM', 'RANDOM'>;
    class: 'RANDOM';
  };
}

const createNftDropSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('This field is required'),
  type: Yup.string()
    .required('This field is required'),
  monkeynaut: Yup.object().when('type', {
    is: (value: any) => value === 'MONKEYNAUT',
    then: Yup.object({
      role: Yup.string()
        .required('This field is required'),
      rank: Yup.string()
        .required('This field is required'),
    })
  }),
  ship: Yup.object().when('type', {
    is: (value: any) => value === 'SHIP',
    then: Yup.object({
      role: Yup.string()
        .required('This field is required'),
      rank: Yup.string()
        .required('This field is required'),
    })
  }),
});

const roleFields = {
  MONKEYNAUT: [
    {
      value: 'RANDOM',
      label: 'Random'
    },
  ],
  SHIP: [
    {
      value: 'RANDOM',
      label: 'Random'
    },
  ],
  PACK: []
};

const ranksFields = {
  MONKEYNAUT: [
    {
      value: 'PRIVATE',
      label: 'Private'
    },
    {
      value: 'SERGEANT',
      label: 'Sergeant'
    },
    {
      value: 'CAPTAIN',
      label: 'Captain'
    },
    {
      value: 'MAJOR',
      label: 'Major'
    },
    {
      value: 'RANDOM',
      label: 'Random'
    },
  ],
  SHIP: [
    {
      value: 'B',
      label: 'B'
    },
    {
      value: 'A',
      label: 'A'
    },
    {
      value: 'S',
      label: 'S'
    },
    {
      value: 'RANDOM',
      label: 'Random'
    },
  ],
  PACK: []
};

const types = [
  {
    value: 'MONKEYNAUT',
    label: 'Monkeynaut'
  },
  {
    value: 'SHIP',
    label: 'Ship'
  },
  {
    value: 'PACK',
    label: 'Pack'
  },
];

export function AdminAirDropNft() {
  const formRef = useRef<FormHandles>(null);

  const [currentType, setCurrentType] = useState<AirDropType | null>(null);

  async function createNftDrop(data: AirDropData, rest: any) {
    try {
      await createNftDropSchema.validate(data, {
        abortEarly: false
      });

      await baseApi.post('/sale-events/create-air-drop-nft', data);

      rest.reset();

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
          <S.FormContainer ref={formRef} onSubmit={createNftDrop}>
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
            {currentType === 'MONKEYNAUT' && (
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
            {currentType === 'SHIP' && (
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