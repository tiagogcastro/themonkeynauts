import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Button, Input } from '@/components';
import { InputSelect } from '@/components/HTML/InputSelect';
import { baseApi } from '@/services/api';
import { COLORS } from '@/theme';
import { ApiError } from '@/utils/apiError';
import * as S from './styles';

type AirDropType = 'Monkeynaut' | 'Ship' | 'Pack';

type MonkeynautRanks = 'Private' | 'Sergeant' | 'Captain' | 'Major';
type ShipRanks = 'A' | 'B' | 'S';

type AirDropFormData = {
  email: string;
  type: AirDropType;
  monkeynaut?: {
    rank: MonkeynautRanks | 'Random';
    role: 'Random';
  };
  ship?: {
    rank: ShipRanks | 'Random';
    role: 'Random';
  };
};

const createNftDropSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('This field is required'),
  type: Yup.string()
    .required('This field is required'),
  monkeynaut: Yup.object().when('type', ([type], schema) =>
    type === 'Monkeynaut'
      ? schema.shape({
          role: Yup.string().required('This field is required'),
          rank: Yup.string().required('This field is required'),
        })
      : schema.notRequired(),
  ),
  ship: Yup.object().when('type', ([type], schema) =>
    type === 'Ship'
      ? schema.shape({
          role: Yup.string().required('This field is required'),
          rank: Yup.string().required('This field is required'),
        })
      : schema.notRequired(),
  ),
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
} as const;

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
      value: 'A',
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
} as const;

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
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AirDropFormData>({
    resolver: yupResolver(createNftDropSchema) as never,
  });

  const currentType = watch('type');

  async function createNftDrop(data: AirDropFormData) {
    try {
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
      });
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.MainContent>
          <S.FormContainer onSubmit={handleSubmit(createNftDrop)}>
            <h1>Air drop NFT</h1>
            <Input
              labelText='E-mail'
              error={errors.email?.message}
              registration={register('email')}
            />
            <InputSelect
              labelText='Type'
              fields={types}
              error={errors.type?.message}
              registration={register('type')}
            />
            {currentType === 'Monkeynaut' && (
              <>
                <InputSelect
                  labelText='Role'
                  fields={[...roleFields[currentType]]}
                  error={(errors.monkeynaut as any)?.role?.message}
                  registration={register('monkeynaut.role')}
                />
                <InputSelect
                  labelText='Rank'
                  fields={[...ranksFields[currentType]]}
                  error={(errors.monkeynaut as any)?.rank?.message}
                  registration={register('monkeynaut.rank')}
                />
              </>
            )}
            {currentType === 'Ship' && (
              <>
                <InputSelect
                  labelText='Role'
                  fields={[...roleFields[currentType]]}
                  error={(errors.ship as any)?.role?.message}
                  registration={register('ship.role')}
                />
                <InputSelect
                  labelText='Rank'
                  fields={[...ranksFields[currentType]]}
                  error={(errors.ship as any)?.rank?.message}
                  registration={register('ship.rank')}
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
