type MailDefault = {
  from: {
    name: string;
    address: string;
  };
};

export type MailDriver = 'ethereal';

type MailConfig = {
  driver: MailDriver;
  config: {
    ethereal: {
      defaults: MailDefault;
    };
  };
};

const mailConfig: MailConfig = {
  driver: 'ethereal',
  config: {
    ethereal: {
      defaults: {
        from: {
          name: 'The Monkeynauts',
          address: 'support@themonkeynauts.local',
        },
      },
    },
  },
};

export { mailConfig };
