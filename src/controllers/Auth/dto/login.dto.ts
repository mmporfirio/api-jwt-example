import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('Email inválido')
    .trim(),
  senha: z.string({ required_error: 'Campo obrigatório' }),
});
