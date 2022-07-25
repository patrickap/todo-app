import { Request, Response, NextFunction } from 'express';
import { t } from 'i18next';

const responseMessage = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.error = (options?: { code?: number; message?: string }) => {
    response.status(500).send({
      code: options?.code ?? 500,
      message: options?.message ?? t('error_message.default'),
    });
    return;
  };

  response.success = <T>(options?: {
    code?: number;
    message?: string;
    data?: T;
  }) => {
    response
      .status(200)
      .send({
        code: options?.code ?? 200,
        message: options?.message ?? t('success_message.default'),
        data: options?.data ?? undefined,
      });
    return;
  };
  next();
};

export { responseMessage };
