export class Exception extends Error {
  constructor(
    protected readonly statusCode: number,
    message: string
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
