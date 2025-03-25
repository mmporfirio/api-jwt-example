import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { ENV } from '../config';
import { NextFunction, Request, Response } from 'express';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req?.headers?.authorization?.split(' ')[1] ?? '';

    const isTokenValid = await jwt.verify(token, ENV().JWT_SECRET_KEY);

    if (!isTokenValid) {
      res.status(401);
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err instanceof JsonWebTokenError ? err.message : err,
    });
  }
}
