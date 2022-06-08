import 'reflect-metadata';
import { ResetFuelBusinessLogic } from '@modules/ships/core/business-logic/reset-fuel';
import { container } from 'tsyringe';
import { app } from './app';

if (!(process.env.NODE_ENV === 'production')) {
  process.on('SIGTERM', () => {
    process.exit();
  });
}

app.listen(process.env.PORT || 3333, () => {
  container.resolve(ResetFuelBusinessLogic);

  console.log('👾 Server started on port 3333');
});
