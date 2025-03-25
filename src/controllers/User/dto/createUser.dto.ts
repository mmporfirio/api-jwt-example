import * as z from 'zod';
import { isValidCpf } from '../../../utils';

const createUserSchema = z.object({
  nome: z.string({ required_error: 'Campo obrigatório' }),
  senha: z.string({ required_error: 'Campo obrigatório' }),
  cpf: z
    .string({ required_error: 'Campo obrigatório' })
    .refine(isValidCpf, { message: 'CPF inválido' }),
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('Campo inválido')
    .trim(),
});

export { createUserSchema };
