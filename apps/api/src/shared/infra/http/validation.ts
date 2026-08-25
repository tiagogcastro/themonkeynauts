import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

type ValidationSchemas = {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
};

export const validate =
  (schemas: ValidationSchemas) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        request.body = schemas.body.parse(request.body ?? {});
      }

      if (schemas.params) {
        const parsed = schemas.params.parse(request.params ?? {});

        Object.defineProperty(request, 'params', {
          value: parsed,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }

      if (schemas.query) {
        const parsed = schemas.query.parse(request.query ?? {});

        Object.defineProperty(request, 'query', {
          value: parsed,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
