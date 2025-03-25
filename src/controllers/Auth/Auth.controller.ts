import { NextFunction, Response, Request } from 'express';
import { ENV } from '../../config';
import { loginSchema } from './dto';
import { RequestValidator } from '../../helpers';
import { authService, userService } from '../../services';

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = RequestValidator.handleValidation(
        req.body,
        res,
        loginSchema
      );

      if (!validatedData) return;

      const user = await userService.findByEmail(validatedData.email);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
        return;
      }

      const data = await authService.login(user, validatedData.senha);

      if (!data.success) {
        res.status(400).json({
          success: false,
        });
        return;
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
