type ServiceResponseType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'SUCCESFUL';

export type ServiceResponseError = {
  status: ServiceResponseType,
  data: { message: string }
};

export type ServiceResponseSuccess<Type> = {
  status: ServiceResponseType,
  data: Type
};

export type ServiceResponse<Type> = ServiceResponseError | ServiceResponseSuccess<Type>;
