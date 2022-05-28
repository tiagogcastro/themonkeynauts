type MailDefault = {
  from: {
    name: string;
    address: string;
  };
};

type MailConfig = {
  driver: 'ethereal' | 'ses';
  config: {
    ethereal: {
      defaults: MailDefault;
    };
    ses: {
      defaults: MailDefault;
    };
  };
};

const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  config: {
    ethereal: {
      defaults: {
        from: {
          name: 'Equipe Ethereal',
          address: 'etherealmail@mail.com',
        },
      },
    },
    ses: {
      defaults: {
        from: {
          name: 'Equipe SES',
          address: 'sesmail@mail.com',
        },
      },
    },
  },
} as MailConfig;

export { mailConfig };
