export class AppError extends Error {
  statusCode: number;
  details?: { field: string; message: string }[];

  constructor(message: string, statusCode: number, details?: { field: string; message: string }[]) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = "AppError";
  }
}