export enum ValidationError {
  REQUIRED = 'Field is required',
  INVALID_EMAIL = 'Invalid email format',
  TOO_SHORT = 'Value is too short',
  TOO_LONG = 'Value is too long',
  NOT_A_NUMBER = 'Value must be a number',
  INVALID_URL = 'Invalid URL format',
  PASSWORD_MISMATCH = 'Passwords do not match',
  OUT_OF_RANGE = 'Value is out of the allowed range',
  INVALID_DATE = 'Invalid date format',
  UNIQUE_CONSTRAINT = 'Value must be unique',
  NON_EMPTY = 'Non Empty'
}
