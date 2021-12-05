export interface ApiErrors {
  [key: string]: {
    defaultError: string,
    errors?: [number[], string][]}
}

export interface ApiWarns {
  [key: string]: {
    defaultWarn: string,
    warns?: [number[], string][]}
}
