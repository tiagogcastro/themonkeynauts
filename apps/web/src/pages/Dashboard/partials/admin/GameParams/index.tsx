import { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Button, Input } from '@/components';
import * as S from './styles';
import { baseApi } from '@/services/api';
import { COLORS } from '@/theme';
import { ApiError } from '@/utils/apiError';

const numberField = Yup.number().integer().transform(
  (value, originalValue) => (originalValue === '' ? undefined : value),
).required('This field is required');

const schema = Yup.object().shape({
  gameClientVersion: Yup.string()
    .required('This field is required'),

  travelFuelConsuption: numberField,
  bountyHuntFuelConsuption: numberField,
  shipRefuelCostInPercentage: numberField,

  bountyHuntMinReward: numberField,
  bountyHuntMaxReward: numberField,

  mineGoldAverageResourceReward: numberField,
  mineGoldAverageSpcReward: numberField,
  mineGoldRewardsVariation: numberField,

  mineIronAverageResourceReward: numberField,
  mineIronAverageSpcReward: numberField,
  mineIronRewardsVariation: numberField,

  mineCopperAverageResourceReward: numberField,
  mineCopperAverageSpcReward: numberField,
  mineCooperRewardsVariation: numberField,

  mineScrapAverageResourceReward: numberField,
  mineScrapAverageSpcReward: numberField,
  mineScrapRewardsVariation: numberField,
});

type GameParams = {
  gameClientVersion: string;

  travelFuelConsuption: number;
  bountyHuntFuelConsuption: number;
  shipRefuelCostInPercentage: number;

  bountyHuntMinReward: number;
  bountyHuntMaxReward: number;

  mineGoldAverageResourceReward: number;
  mineGoldAverageSpcReward: number;
  mineGoldRewardsVariation: number;

  mineIronAverageResourceReward: number;
  mineIronAverageSpcReward: number;
  mineIronRewardsVariation: number;

  mineCopperAverageResourceReward: number;
  mineCopperAverageSpcReward: number;
  mineCooperRewardsVariation: number;

  mineScrapAverageResourceReward: number;
  mineScrapAverageSpcReward: number;
  mineScrapRewardsVariation: number;
};

type CreateGameParamsData = GameParams;

const numeric = {
  valueAsNumber: true,
} as const;

export function AdminGameParams() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateGameParamsData>({
    resolver: yupResolver(schema),
  });

  async function getGameParams() {
    const response = await baseApi.get('/game-params/fetch');

    const gameParams = response.data.data.gameParams as GameParams | null;

    if (gameParams) {
      reset(gameParams);
    }
  }

  useEffect(() => {
    getGameParams();
  }, []);

  async function changeGameParams(data: CreateGameParamsData) {
    try {
      await baseApi.post('/admins/game-params/set', data);

      toast(`Game params updated successfully`, {
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

          <h1>Game params</h1>

          <S.FormContainer onSubmit={handleSubmit(changeGameParams)}>
            <div className="groups">
              <Input
                type="text"
                labelText='Game Client version'
                error={errors.gameClientVersion?.message}
                registration={register('gameClientVersion')}
              />
              <Input
                type="number"
                labelText='Bounty hunt min reward'
                error={errors.bountyHuntMinReward?.message}
                registration={register('bountyHuntMinReward', numeric)}
              />
              <Input
                type="number"
                labelText='Bounty Hunt max reward'
                error={errors.bountyHuntMaxReward?.message}
                registration={register('bountyHuntMaxReward', numeric)}
              />
            </div>

            <div className="groups">
              <Input
                type="number"
                labelText='Travel Fuel consuption'
                error={errors.travelFuelConsuption?.message}
                registration={register('travelFuelConsuption', numeric)}
              />
              <Input
                type="number"
                labelText='Bounty Hunt fuel consuption'
                error={errors.bountyHuntFuelConsuption?.message}
                registration={register('bountyHuntFuelConsuption', numeric)}
              />
              <Input
                type="number"
                labelText='Ship Refuel cost in percentage'
                error={errors.shipRefuelCostInPercentage?.message}
                registration={register('shipRefuelCostInPercentage', numeric)}
              />
            </div>

            <div className="groups">
              <Input
                type="number"
                labelText='Mine Gold average resource reward'
                error={errors.mineGoldAverageResourceReward?.message}
                registration={register('mineGoldAverageResourceReward', numeric)}
              />
              <Input
                type="number"
                labelText='Mine Gold average spc reward'
                error={errors.mineGoldAverageSpcReward?.message}
                registration={register('mineGoldAverageSpcReward', numeric)}
              />
              <Input
                type="number"
                labelText='Mine Gold rewards variation'
                error={errors.mineGoldRewardsVariation?.message}
                registration={register('mineGoldRewardsVariation', numeric)}
              />
            </div>

            <div className="groups">
              <Input
                type="number"
                labelText='Mine Iron average resource reward'
                error={errors.mineIronAverageResourceReward?.message}
                registration={register('mineIronAverageResourceReward', numeric)}
              />
              <Input
                type="number"
                labelText='Mine Iron average spc reward'
                error={errors.mineIronAverageSpcReward?.message}
                registration={register('mineIronAverageSpcReward', numeric)}
              />
              <Input
                type="number"
                labelText='Mine Iron rewards variation'
                error={errors.mineIronRewardsVariation?.message}
                registration={register('mineIronRewardsVariation', numeric)}
              />
            </div>

            <div className="groups">
              <Input
                type="number"
                labelText='Mine Copper average resource reward'
                error={errors.mineCopperAverageResourceReward?.message}
                registration={register('mineCopperAverageResourceReward', numeric)}
              />
              <Input
                type="number"
                labelText='Mine Copper average spc reward'
                error={errors.mineCopperAverageSpcReward?.message}
                registration={register('mineCopperAverageSpcReward', numeric)}
              />
              <Input
                type="number"
                labelText='Mine Cooper rewards variation'
                error={errors.mineCooperRewardsVariation?.message}
                registration={register('mineCooperRewardsVariation', numeric)}
              />
            </div>

            <div className="groups">
              <Input
                type="number"
                labelText='Mine Scrap average resource reward'
                error={errors.mineScrapAverageResourceReward?.message}
                registration={register('mineScrapAverageResourceReward', numeric)}
              />
              <Input
                type="number"
                labelText='Mine Scrap average spc reward'
                error={errors.mineScrapAverageSpcReward?.message}
                registration={register('mineScrapAverageSpcReward', numeric)}
              />
              <Input
                type="number"
                labelText='Mine Scrap rewards variation'
                error={errors.mineScrapRewardsVariation?.message}
                registration={register('mineScrapRewardsVariation', numeric)}
              />
            </div>

            <Button text="Update" type="submit" />
          </S.FormContainer>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}
