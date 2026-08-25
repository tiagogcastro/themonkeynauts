declare global {
  namespace Express {
    export interface Request {
      player: {
        id: string;
      };
    }
  }
}

export {};
