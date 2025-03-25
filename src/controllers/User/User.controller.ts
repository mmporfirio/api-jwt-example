import { NextFunction, Response, Request } from 'express';
import { createUserSchema } from './dto';
import { RequestValidator } from '../../helpers';
import { userService } from '../../services';

class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = RequestValidator.handleValidation(
        req.body,
        res,
        createUserSchema
      );

      if (!validatedData) return;

      const createdUser = await userService.create(validatedData);

      res.status(201).json({
        success: true,
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
