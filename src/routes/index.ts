import { Router } from 'express';
import AuthController from '../controllers/Auth/Auth.controller';
import UserController from '../controllers/User/User.controller';
import { authMiddleware } from '../middleware';

const routes = Router({ mergeParams: true });

routes.post(`/login`, AuthController.login);
routes.post(`/register`, UserController.create);

routes.use(authMiddleware);
routes.get(`/users`, UserController.getAll);

export default routes;
