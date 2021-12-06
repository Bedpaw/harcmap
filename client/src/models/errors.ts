export interface ApiError {
  defaultError: string,
  errors?: [number[], string][]
}

export interface ApiErrors {
  [key: string]: ApiError
}

export interface BackendError {
  error: number;
  message: string;
  errorDetails: string[]
}
