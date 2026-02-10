export interface AppError {
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  data?: any;
  stack?: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  data?: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  customMessage?: string;
}
