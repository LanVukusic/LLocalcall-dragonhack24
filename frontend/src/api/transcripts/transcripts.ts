/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * Hackathon DH API
 * WIP
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import type { CreateTranscriptDto, UpdateTranscriptDto } from '.././model';
import { customInstance } from '.././mutator/custom-instance';
import type { ErrorType, BodyType } from '.././mutator/custom-instance';

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const transcriptsControllerCreate = (
  createTranscriptDto: BodyType<CreateTranscriptDto>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<string>(
    {
      url: `/transcripts`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createTranscriptDto,
    },
    options,
  );
};

export const getTranscriptsControllerCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transcriptsControllerCreate>>,
    TError,
    { data: BodyType<CreateTranscriptDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof transcriptsControllerCreate>>,
  TError,
  { data: BodyType<CreateTranscriptDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof transcriptsControllerCreate>>,
    { data: BodyType<CreateTranscriptDto> }
  > = (props) => {
    const { data } = props ?? {};

    return transcriptsControllerCreate(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type TranscriptsControllerCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof transcriptsControllerCreate>>
>;
export type TranscriptsControllerCreateMutationBody =
  BodyType<CreateTranscriptDto>;
export type TranscriptsControllerCreateMutationError = ErrorType<unknown>;

export const useTranscriptsControllerCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transcriptsControllerCreate>>,
    TError,
    { data: BodyType<CreateTranscriptDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof transcriptsControllerCreate>>,
  TError,
  { data: BodyType<CreateTranscriptDto> },
  TContext
> => {
  const mutationOptions =
    getTranscriptsControllerCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const transcriptsControllerFindAll = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<string>(
    { url: `/transcripts`, method: 'GET', signal },
    options,
  );
};

export const getTranscriptsControllerFindAllQueryKey = () => {
  return [`/transcripts`] as const;
};

export const getTranscriptsControllerFindAllQueryOptions = <
  TData = Awaited<ReturnType<typeof transcriptsControllerFindAll>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof transcriptsControllerFindAll>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTranscriptsControllerFindAllQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof transcriptsControllerFindAll>>
  > = ({ signal }) => transcriptsControllerFindAll(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof transcriptsControllerFindAll>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TranscriptsControllerFindAllQueryResult = NonNullable<
  Awaited<ReturnType<typeof transcriptsControllerFindAll>>
>;
export type TranscriptsControllerFindAllQueryError = ErrorType<unknown>;

export const useTranscriptsControllerFindAll = <
  TData = Awaited<ReturnType<typeof transcriptsControllerFindAll>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof transcriptsControllerFindAll>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTranscriptsControllerFindAllQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const transcriptsControllerFindOne = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<string>(
    { url: `/transcripts/${id}`, method: 'GET', signal },
    options,
  );
};

export const getTranscriptsControllerFindOneQueryKey = (id: string) => {
  return [`/transcripts/${id}`] as const;
};

export const getTranscriptsControllerFindOneQueryOptions = <
  TData = Awaited<ReturnType<typeof transcriptsControllerFindOne>>,
  TError = ErrorType<unknown>,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof transcriptsControllerFindOne>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTranscriptsControllerFindOneQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof transcriptsControllerFindOne>>
  > = ({ signal }) => transcriptsControllerFindOne(id, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof transcriptsControllerFindOne>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TranscriptsControllerFindOneQueryResult = NonNullable<
  Awaited<ReturnType<typeof transcriptsControllerFindOne>>
>;
export type TranscriptsControllerFindOneQueryError = ErrorType<unknown>;

export const useTranscriptsControllerFindOne = <
  TData = Awaited<ReturnType<typeof transcriptsControllerFindOne>>,
  TError = ErrorType<unknown>,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof transcriptsControllerFindOne>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTranscriptsControllerFindOneQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const transcriptsControllerUpdate = (
  id: string,
  updateTranscriptDto: BodyType<UpdateTranscriptDto>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<string>(
    {
      url: `/transcripts/${id}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: updateTranscriptDto,
    },
    options,
  );
};

export const getTranscriptsControllerUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transcriptsControllerUpdate>>,
    TError,
    { id: string; data: BodyType<UpdateTranscriptDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof transcriptsControllerUpdate>>,
  TError,
  { id: string; data: BodyType<UpdateTranscriptDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof transcriptsControllerUpdate>>,
    { id: string; data: BodyType<UpdateTranscriptDto> }
  > = (props) => {
    const { id, data } = props ?? {};

    return transcriptsControllerUpdate(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type TranscriptsControllerUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof transcriptsControllerUpdate>>
>;
export type TranscriptsControllerUpdateMutationBody =
  BodyType<UpdateTranscriptDto>;
export type TranscriptsControllerUpdateMutationError = ErrorType<unknown>;

export const useTranscriptsControllerUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transcriptsControllerUpdate>>,
    TError,
    { id: string; data: BodyType<UpdateTranscriptDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof transcriptsControllerUpdate>>,
  TError,
  { id: string; data: BodyType<UpdateTranscriptDto> },
  TContext
> => {
  const mutationOptions =
    getTranscriptsControllerUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const transcriptsControllerRemove = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<string>(
    { url: `/transcripts/${id}`, method: 'DELETE' },
    options,
  );
};

export const getTranscriptsControllerRemoveMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transcriptsControllerRemove>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof transcriptsControllerRemove>>,
  TError,
  { id: string },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof transcriptsControllerRemove>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {};

    return transcriptsControllerRemove(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type TranscriptsControllerRemoveMutationResult = NonNullable<
  Awaited<ReturnType<typeof transcriptsControllerRemove>>
>;

export type TranscriptsControllerRemoveMutationError = ErrorType<unknown>;

export const useTranscriptsControllerRemove = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transcriptsControllerRemove>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationResult<
  Awaited<ReturnType<typeof transcriptsControllerRemove>>,
  TError,
  { id: string },
  TContext
> => {
  const mutationOptions =
    getTranscriptsControllerRemoveMutationOptions(options);

  return useMutation(mutationOptions);
};
