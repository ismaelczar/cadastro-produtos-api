import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token is missing' });
    return;
  }

  const [_, token] = authHeader.split(' ');

  try {
    //TODO: Criar arquivo para o hash
    const decoded = verify(token, process.env.JWT_SECRET);
    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
}
