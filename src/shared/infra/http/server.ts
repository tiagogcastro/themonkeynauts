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
      'MM/dd/yyyy HH:mm:ss',
    )} UTC] the monkeynauts server started on port 3333`,
  );
});
