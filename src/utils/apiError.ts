export type ApiError = {
  messages: string[];
  name: string;
  statusCode: number;
}

export function ApiError(error: any): ApiError {
  let  err: ApiError;

  if(error.response.data.message) {
    const message = error.response.data.message;

    err = {
      messages: [message],
      name: 'name',
      statusCode: 400
    };
  } else {
    const _error = error.response.data.error;

    err = _error;
  }

  return err;
}
