import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Button, Input } from '@/components';
import { UnformTextarea } from '@/components/HTML/UnformTextarea';
import { baseApi } from '@/services/api';
import { Player } from '@/services/app_api/player/types';
import { COLORS } from '@/theme';
import { ApiError } from '@/utils/apiError';
import * as S from './styles';

const banAccountSchema = Yup.object().shape({
  playerIdOrWallet: Yup.string()
    .required('This field is required'),
  reason: Yup.string()
    .required('This field is required'),
});

type BanAccountFormData = Yup.InferType<typeof banAccountSchema>;

type GetPlayer = {
  data: Player
}

export function AdminBanAccount() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BanAccountFormData>({
    resolver: yupResolver(banAccountSchema),
  });

  async function banAccountSubmit(data: BanAccountFormData) {
    try {
      const response = await baseApi.patch<GetPlayer>('/admins/players/ban-unban-player', data);

      const player = response.data.data;

      const successMessage = player.isBanned
        ? `Player ${player.nickname} has been banned`
        : `Player ${player.nickname} has been unbanned`;

      toast(successMessage, {
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

      reset();
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
          <S.FormContainer onSubmit={handleSubmit(banAccountSubmit)}>
            <h1>Ban Account</h1>
            <Input
              labelText='Player ID or Wallet'
              error={errors.playerIdOrWallet?.message}
              registration={register('playerIdOrWallet')}
            />
            <UnformTextarea
              labelText='Reason'
              error={errors.reason?.message}
              registration={register('reason')}
            />
            <Button text="Send" type="submit" />
          </S.FormContainer>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}
