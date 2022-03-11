export interface ApiError {
  defaultError: string,
}
export interface ApiErrors {
  [key: string]: ApiError
}

export interface ServerError {
  error: number;
  message: string;
  errorDetails?: string[]
}
