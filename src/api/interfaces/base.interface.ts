export interface IResponse<T> {
  message: T;
  error: string | null;
}
