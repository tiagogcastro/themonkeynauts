import { Nullable } from '../logic/nullable';

export type HttpBodyResponse = {
  data: any;
  error: Nullable<{
    where?: string;
    statusCode: number;
    name: string;
    messages: string[];
  }>;
};

export type HttpResponse = {
  statusCode: number;
  body?: HttpBodyResponse;
};

export function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    ...(dto
      ? {
          body: {
            data: dto,
            error: null,
          },
        }
      : {}),
  };
}

export function created<T>(dto?: T): HttpResponse {
  return {
    statusCode: 201,
    ...(dto
      ? {
          body: {
            data: dto,
            error: null,
          },
        }
      : {}),
  };
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      data: null,
      error: {
        statusCode: 400,
        name: error.name,
        messages: [error.message],
      },
    },
  };
}

export function unauthorized(error: Error): HttpResponse {
  return {
    statusCode: 401,
    body: {
      data: null,
      error: {
        statusCode: 401,
        name: error.name,
        messages: [error.message],
      },
    },
  };
}

export function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      data: null,
      error: {
        statusCode: 403,
        name: error.name,
        messages: [error.message],
      },
    },
  };
}

export function notFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      data: null,
      error: {
        statusCode: 404,
        name: error.name,
        messages: [error.message],
      },
    },
  };
}

export function conflict(error: Error): HttpResponse {
  return {
    statusCode: 409,
    body: {
      data: null,
      error: {
        statusCode: 409,
        name: error.name,
        messages: [error.message],
      },
    },
  };
}

export function tooMany(error: Error): HttpResponse {
  return {
    statusCode: 429,
    body: {
      data: null,
      error: {
        statusCode: 429,
        name: error.name,
        messages: [error.message],
      },
    },
  };
}

export function fail(error: Error, where?: string) {
  console.log(where);
  console.log(error);

  return {
    statusCode: 500,
    body: {
      data: null,
      error: {
        where,
        statusCode: 500,
        name: error.name,
        messages: [error.message],
      },
    },
  };
}
