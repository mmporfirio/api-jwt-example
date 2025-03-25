import request from 'supertest';
import prismaClient from '../prisma/prismaClient';
import { app } from '../src/app';

describe('Auth API', () => {
  let authToken: string;
  const testUser = {
    email: 'usuarioteste@hotmail.com',
    nome: 'Teste',
    senha: 'teste123',
    cpf: '975.699.060-04',
  };

  it('POST /register - deve registrar um novo usuário', async () => {
    await prismaClient.user.deleteMany({
      where: {
        email: testUser.email,
      },
    });

    const response = await request(app)
      .post('/register')
      .send(testUser)
      .expect(201);

    expect(response.body).toEqual({
      success: true,
      data: {
        id: expect.any(Number),
        nome: testUser.nome,
        cpf: testUser.cpf,
        email: testUser.email,
      },
    });
  });

  it('POST /login - deve autenticar o usuário', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: testUser.email,
        senha: testUser.senha,
      })
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      token: expect.any(String),
    });

    authToken = response.body.token;
  });

  it('GET /users - deve listar usuários com token válido', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          cpf: expect.any(String),
          email: expect.any(String),
        }),
      ]),
    });
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany({
      where: {
        email: testUser.email,
      },
    });
  });
});
