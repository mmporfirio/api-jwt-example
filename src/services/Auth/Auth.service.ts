import { ENV } from '../../config';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';

class AuthService {
  private create(payload: any, expiresIn = '8h') {
    return jwt.sign(payload, ENV().JWT_SECRET_KEY, { expiresIn });
  }

  async verify(token: string) {
    const tokenVerified = await jwt.verify(
      token,
      ENV().JWT_SECRET_KEY,
      (err) => !err
    );

    return Boolean(tokenVerified);
  }

  async login(user: User, password: string) {
    const isValidPassword = this.validateUserPassword(user, password);

    if (!isValidPassword)
      return {
        success: false,
      };

    const token = await this.create(_omit(user, 'senha'));

    return {
      success: true,
      token,
    };
  }

  private validateUserPassword(
    { senha: storedPassword }: User,
    password: string
  ) {
    return !_isEmpty(password) && bcrypt.compareSync(password, storedPassword);
  }
}

export const authService = new AuthService();
