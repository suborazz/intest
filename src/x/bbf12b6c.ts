import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export type TQueryOptions<TData, TError = Error> = Omit<
  UseQueryOptions<TData, TError, TData, readonly unknown[]>,
  "queryKey" | "queryFn"
>;

export type TQueryReturnType<TData, TError = Error> = UseQueryResult<
  TData,
  TError
>;

export type TMutationOptions<
  TData,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

export type TMutationReturnType<
  TData,
  TVariables,
  TError = Error,
  TContext = unknown,
> = UseMutationResult<TData, TError, TVariables, TContext>;
