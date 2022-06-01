import { Button, Input } from '@/components';
import { InputSelect } from '@/components/HTML/InputSelect';
import { useAuth } from '@/hooks';
import { getValidationErrors } from '@/utils';
import { FormHandles } from '@unform/core';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import * as Yup from 'yup';

import * as S from './styles';

type AirDropNftType = 'monkeynaut' | 'ship';

type SelectOptions = {
  label: string;
  value: string;
}

const createNftDropSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('This field is required'),
  type: Yup.string()
    .required('This field is required'),
  class: Yup.string()
    .required('This field is required'),
  rank: Yup.string()
    .required('This field is required'),
});

const classFields = {
  monkeynaut: [
    {
      value: 'soldier',
      label: 'Soldier'
    },
    {
      value: 'engineer',
      label: 'Engineer'
    },
    {
      value: 'scientist',
      label: 'Scientist'
    },
    {
      value: 'random',
      label: 'Random'
    },
  ],
  ship: [
    {
      value: 'figter',
      label: 'Figter'
    },
    {
      value: 'miner',
      label: 'Miner'
    },
    {
      value: 'explorer',
      label: 'Explorer'
    },
    {
      value: 'random',
      label: 'Random'
    },
  ]
};

const ranksFields = {
  monkeynaut: [
    {
      value: 'private',
      label: 'Private'
    },
    {
      value: 'sergeant',
      label: 'Sergeant'
    },
    {
      value: 'captain',
      label: 'Captain'
    },
    {
      value: 'major',
      label: 'Major'
    },
    {
      value: 'random',
      label: 'Random'
    },
  ],
  ship: [
    {
      value: 'b',
      label: 'B'
    },
    {
      value: 'a',
      label: 'A'
    },
    {
      value: 's',
      label: 'S'
    },
    {
      value: 'random',
      label: 'Random'
    },
  ]
};

const types = [
  {
    value: 'monkeynaut',
    label: 'Monkeynaut'
  },
  {
    value: 'ship',
    label: 'Ship'
  },
];

export function AdminAirDropNft() {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const [type, setType] = useState<AirDropNftType | undefined>(undefined);
  const [nftClassValue, setNftClassValue] = useState({
    classe: {
      value: '',
      label: ''
    },
    rank: {
      value: '',
      label: ''
    }
  });

  function changeType(e: any) {
    setType((prevState) => {
      if(prevState === e.value) {
        return prevState;
      } 

      setNftClassValue({
        classe: {
          value: '',
          label: ''
        },
        rank: {
          value: '',
          label: ''
        }
      });

      return e.value;
    });
  }

  function changeSelect(event: any, name: 'rank' | 'classe') {
    setNftClassValue(prevState => {
      return {
        ...prevState,
        [name]: event
      }
    })
  }

  async function createNftDrop(data: any) {
    try {
      await createNftDropSchema.validate(data, {
        abortEarly: false
      });

      console.log(data);
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
          <S.FormContainer ref={formRef} onSubmit={createNftDrop}>
            <h1>Air drop NFT</h1>
            <Input
              name='email' 
              labelText='E-mail' 
            />
            <InputSelect
              onChange={changeType}
              name='type'
              labelText='Type' 
              fields={types}
            />
            <InputSelect
              value={type && {
                value: nftClassValue.classe.value,
                label: nftClassValue.classe.label
              }}
              onChange={(e: any) => changeSelect(e, 'classe')}
              name='class'
              labelText='Class'
              fields={type ? classFields[type] : []}
            />
            <InputSelect
              value={type && {
                value: nftClassValue.rank.value,
                label: nftClassValue.rank.label
              }}
              onChange={(e: any) => changeSelect(e, 'rank')}
              name='rank'
              labelText='Rank' 
              fields={type ? ranksFields[type] : []}
            />
            <Button text="Send" type="submit" />
          </S.FormContainer>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}