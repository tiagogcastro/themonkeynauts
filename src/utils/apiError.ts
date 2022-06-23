type NewError = {
  messages: string[];
  name: string;
  statusCode: number;
}

type ApiError = {
  error: NewError;
}

export function newApiError(error: any): ApiError | null {
  const err = error.response.data.error;

  if(err) {
    return {
      error: err as NewError
    }
  }

  return null;
}
