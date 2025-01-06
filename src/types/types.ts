import { Prisma } from '@prisma/client';

import { ERROR_CODES } from '@/constants/constant';

export interface UseQueryConfig<T> {
  enabled?: boolean;
  initialData?: T;
  refetchInterval?: number;
}

export interface UseMutationConfig {
  onSuccess?: (data: any) => void;
  onError?: (error: ICommonErrorResponse) => void;
}

type OutputError = {
  error: {
    code: ERROR_CODES;
    payload?: any;
  };
};

export interface ICommonErrorResponse extends OutputError {
  response?: {
    data: OutputError;
  };
  message?: string;
}

export interface ProductAttributesIncludeStockWholesalePrice
  extends Prisma.ProductGetPayload<{
    include: {
      Variant: {
        include: {
          attributes: {
            include: {
              Stock: true;
              WholesalePrice: true;
            };
          };
        };
      };
    };
  }> {}
