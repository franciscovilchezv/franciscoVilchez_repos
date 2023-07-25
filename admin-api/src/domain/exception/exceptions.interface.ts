export interface IExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  notFoundException(data: IExceptionMessage): void;
}
