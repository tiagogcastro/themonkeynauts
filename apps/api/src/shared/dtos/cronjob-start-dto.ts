type CronJobStartDTO = {
  cronTime: string | Date;
  onTick: () => void | Promise<void>;
};
export { CronJobStartDTO };
