import { IPrivateSale } from '../entities/private-sale';

interface IPrivateSaleRepository {
  create(data: IPrivateSale): Promise<void>;
}
export { IPrivateSaleRepository };
