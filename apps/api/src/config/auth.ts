import { SignOptions } from 'jsonwebtoken';

const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'change-me-in-development',
    expiresIn: '1d',
  } satisfies {
    secret: string;
    expiresIn: SignOptions['expiresIn'];
  },
};

export { authConfig };
