import { Request, Response } from 'express';
import { ZodSchema, ZodError } from 'zod';

export abstract class RequestValidator {
  static validateSchema<T>(schema: ZodSchema<T>, data: unknown) {
    return schema.safeParse(data);
  }

  static handleValidation<T>(
    body: Object,
    res: Response,
    schema: ZodSchema<T>
  ): T | undefined {
    const result = this.validateSchema(schema, body);

    if (!result.success) {
      this.sendBadRequest(res, result.error.errors);
      return;
    }

    return result.data;
  }

  static sendBadRequest(res: Response, issues: ZodError['errors']): void {
    const errorMessage = issues.map((issue) => {
      const path = issue.path.join('.');
      return path ? `${path}: ${issue.message}` : issue.message;
    });

    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
}
