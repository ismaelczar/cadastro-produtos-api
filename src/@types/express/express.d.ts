declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role?: boolean;
      };
    }
  }
}

export {};
