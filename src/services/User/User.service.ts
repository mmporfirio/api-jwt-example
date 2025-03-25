import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';
import prismaClient from '../../../prisma/prismaClient';
import { formatMaskedCPF } from '../../utils';

class UserService {
  async getAll() {
    const users = await prismaClient.user.findMany();

    const mappedUsers = users.map(({ cpf, senha: _, ...userData }) => ({
      cpf: formatMaskedCPF(cpf),
      ...userData,
    }));

    return mappedUsers;
  }

  async create(user: Omit<User, 'id'>) {
    const encryptedPassword = bcrypt.hashSync(user.senha, 10);

    const userCreated = await prismaClient.user.create({
      data: {
        ...user,
        senha: encryptedPassword,
      },
    });

    return _omit(userCreated, 'senha');
  }

  async findByEmail(email: string) {
    return prismaClient.user.findFirst({
      where: { email },
    });
  }
}

export const userService = new UserService();
