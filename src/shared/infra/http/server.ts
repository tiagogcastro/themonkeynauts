import { app } from './app';
import { instanceCron } from './execute/instance-cron';

if (!(process.env.NODE_ENV === 'production')) {
  process.on('SIGTERM', () => {
    process.exit();
  });
}

app.listen(process.env.PORT || 3333, () => {
  instanceCron();

  console.log('👾 Server started on port 3333');
});
