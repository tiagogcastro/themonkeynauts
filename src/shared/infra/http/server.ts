import { format } from 'date-fns';
import { app } from './app';
import { instanceCron } from './execute/instance-cron';

if (!(process.env.NODE_ENV === 'production')) {
  process.on('SIGTERM', () => {
    process.exit();
  });
}

app.listen(process.env.PORT || 3333, () => {
  instanceCron();

  console.log(
    `👾 At [${format(
      new Date(),
      'yyyy/MM/dd HH:mm:ss',
    )} UTC] The Monkeynauts server started on port 3333`,
  );
});
