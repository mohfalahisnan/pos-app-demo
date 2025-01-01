export interface UseQueryConfig<T> {
  enabled?: boolean;
  initialData?: T;
  refetchInterval?: number;
}

export interface UseMutationConfig {
  onSuccess?: (data: any) => void;
  onError?: (error: ICommonErrorResponse) => void;
}

declare enum ErrorCodes {
  USER_NOT_AUTHORIZED = 'UserNotAuthorized',
  PASSWORD_NOT_MATCH = 'PasswordNotMatch',
  PASSWORD_NOT_VALID = 'PasswordNotValid',
  USER_NOT_FOUND = 'UserNotFound',
  USER_NOT_FOUND_IN_WORKSPACE = 'UserNotFoundInWorkspace',
  EMAIL_ALREADY_EXISTS = 'EmailAlreadyExists',
  VALIDATION_ERROR = 'ValidationError',
  DUPLICATE_KEY_ERROR = 'DuplicateKeyError'
}

type OutputError = {
  error: {
    code: ErrorCodes;
    payload?: any;
  };
};

export interface ICommonErrorResponse extends OutputError {
  response?: {
    data: OutputError;
  };
  message?: string;
}
