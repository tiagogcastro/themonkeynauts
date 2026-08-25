type MailDefault = {
  from: {
    name: string;
    address: string;
  };
};

export type MailDriver = 'ethereal' | 'ses' | 'mailgun' | 'titan';

type MailConfig = {
  driver: MailDriver;
  config: {
    ethereal: {
      defaults: MailDefault;
    };
    mailgun: {
      defaults: MailDefault;
      domain: string;
    };
    ses: {
      defaults: MailDefault;
    };
    titan: {
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
    mailgun: {
      defaults: {
        from: {
          name: 'The Monkeynauts',
          address: 'support@themonkeynauts.com',
        },
      },
    },
    titan: {
      defaults: {
        from: {
          name: 'The Monkeynauts',
          address: 'support@themonkeynauts.com',
        },
      },
    },
    ses: {
      defaults: {
        from: {
          name: 'The Monkeynauts',
          address: 'support@themonkeynauts.com',
        },
      },
    },
  },
} as MailConfig;

export { mailConfig };
