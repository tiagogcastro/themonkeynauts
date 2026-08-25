import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Button, Input } from '@/components';
import * as S from './styles';
import { baseApi } from '@/services/api';
import { COLORS } from '@/theme';
import { ApiError } from '@/utils/apiError';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required'),
  txHash: Yup.string()
    .required('This field is required'),
});

type SendPrivateP2PFormData = Yup.InferType<typeof schema>;

export function OwnerSendPrivateP2P() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SendPrivateP2PFormData>({
    resolver: yupResolver(schema),
  });

  async function sendPrivateP2P(data: SendPrivateP2PFormData) {
    try {
      await baseApi.post('/owners/private-p2p/send', data);

      reset();

      toast(`Private P2P sent to ${data.email} successfully`, {
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

          <S.FormContainer onSubmit={handleSubmit(sendPrivateP2P)}>
            <h1>Send Private P2P</h1>

            <Input
              type="text"
              labelText='E-mail'
              error={errors.email?.message}
              registration={register('email')}
            />
            <Input
              type="text"
              labelText='Tx Hash'
              containerProps={{
                className: "tx_hash"
              }}
              error={errors.txHash?.message}
              registration={register('txHash')}
            />

            <Button text="Send" type="submit" />
          </S.FormContainer>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}
