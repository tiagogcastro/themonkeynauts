import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { getValidationErrors } from '@/utils';

import { Button, Input } from '@/components';

import * as S from './styles';
import { baseApi } from '@/services/api';
import { toast } from 'react-toastify';
import { COLORS } from '@/theme';
import { ApiError } from '@/utils/apiError';

const schema = Yup.object().shape({
  gameClientVersion: Yup.string()
    .required('This field is required'),

  travelFuelConsuption: Yup.number().integer()
    .required('This field is required'),
  bountyHuntFuelConsuption: Yup.number().integer()
    .required('This field is required'),
  shipRefuelCostInPercentage: Yup.number().integer()
    .required('This field is required'),

  bountyHuntMinReward: Yup.number().integer()
    .required('This field is required'),
  bountyHuntMaxReward: Yup.number().integer()
    .required('This field is required'),

  mineGoldAverageResourceReward: Yup.number().integer()
    .required('This field is required'),
  mineGoldAverageSpcReward: Yup.number().integer()
    .required('This field is required'),
  mineGoldRewardsVariation: Yup.number().integer()
    .required('This field is required'),

  mineIronAverageResourceReward: Yup.number().integer()
    .required('This field is required'),
  mineIronAverageSpcReward: Yup.number().integer()
    .required('This field is required'),
  mineIronRewardsVariation: Yup.number().integer()
    .required('This field is required'),

  mineCopperAverageResourceReward: Yup.number().integer()
    .required('This field is required'),
  mineCopperAverageSpcReward: Yup.number().integer()
    .required('This field is required'),
  mineCooperRewardsVariation: Yup.number().integer()
    .required('This field is required'),

  mineScrapAverageResourceReward: Yup.number().integer()
    .required('This field is required'),
  mineScrapAverageSpcReward: Yup.number().integer()
    .required('This field is required'),
  mineScrapRewardsVariation: Yup.number().integer()
    .required('This field is required'),
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
}

type CreateGameParamsData = GameParams;

export function AdminGameParams() {
  const formRef = useRef<FormHandles>(null);

  const [gameParams, setGameParams] = useState<GameParams | null>(null);

  async function getGameParams() {
    const response = await baseApi.get('/admins/game-params/list');

    setGameParams(response.data.data.gameParams);
  }

  useEffect(() => {
    getGameParams();
  }, []);

  async function changeGameParams(data: CreateGameParamsData, rest: any) {
    try {
      await schema.validate(data, {
        abortEarly: false
      });

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
  return (
    <S.Container>
      <S.Content>
        <S.MainContent>

          <h1>Game params</h1>

          <S.FormContainer ref={formRef} onSubmit={changeGameParams} initialData={gameParams ? gameParams : undefined}>
            <Input 
              name="gameClientVersion"
              type="text"
              labelText='Game Client version'
            />

            <Input 
              name="travelFuelConsuption"
              type="number"
              labelText='Travel Fuel consuption'
            />
            <Input 
              name="bountyHuntFuelConsuption"
              type="number"
              labelText='Bounty Hunt fuel consuption'
            />
            <Input 
              name="shipRefuelCostInPercentage"
              type="number"
              labelText='Ship Refuel cost in percentage'
            />

            <Input 
              name="bountyHuntMinReward"
              type="number"
              labelText='Bounty hunt min reward'
            />
            <Input 
              name="bountyHuntMaxReward"
              type="number"
              labelText='Bounty Hunt max reward'
            />

            <Input 
              name="mineGoldAverageResourceReward"
              type="number"
              labelText='Mine Gold average resource reward'
            />
            <Input 
              name="mineGoldAverageSpcReward"
              type="number"
              labelText='Mine Gold average spc reward'
            />
            <Input 
              name="mineGoldRewardsVariation"
              type="number"
              labelText='Mine Gold rewards variation'
            />

            <Input 
              name="mineIronAverageResourceReward"
              type="number"
              labelText='Mine Iron average resource reward'
            />
            <Input 
              name="mineIronAverageSpcReward"
              type="number"
              labelText='Mine Iron average spc reward'
            />
            <Input 
              name="mineIronRewardsVariation"
              type="number"
              labelText='Mine Iron rewards variation'
            />

            <Input 
              name="mineCopperAverageResourceReward"
              type="number"
              labelText='Mine Copper average resource reward'
            />
            <Input 
              name="mineCopperAverageSpcReward"
              type="number"
              labelText='Mine Copper average spc reward'
            />
            <Input 
              name="mineCooperRewardsVariation"
              type="number"
              labelText='Mine Cooper rewards variation'
            />

            <Input 
              name="mineScrapAverageResourceReward"
              type="number"
              labelText='Mine Scrap average resource reward'
            />
            <Input 
              name="mineScrapAverageSpcReward"
              type="number"
              labelText='Mine Scrap average spc reward'
            />
            <Input 
              name="mineScrapRewardsVariation"
              type="number"
              labelText='Mine Scrap rewards variation'
            />
            <Button text="Update" type="submit" />
          </S.FormContainer>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}