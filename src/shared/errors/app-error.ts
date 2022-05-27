export class AppError {
  constructor(
    public readonly message: string,
    public readonly httpCode: number = 400,
  ) { }
}
