export type Success<S> = {
  readonly tag: "success";
  readonly success: S;
};

export type RError<E> = {
  readonly tag: "error";
  readonly error: E;
};

export type Result<S, E> = Success<S> | RError<E>;

declare namespace Result {
  export type Any = Result<unknown, unknown>;
  export type Error<T extends Any> =
    T extends Result<infer _S, infer X> ? X : never;
  export type Success<T extends Any> =
    T extends Result<infer X, infer _R> ? X : never;
}

export function createSuccess<S>(s: S): Success<S> {
  return {
    tag: "success",
    success: s,
  };
}

export function createError<E>(e: E): RError<E> {
  return {
    tag: "error",
    error: e,
  };
}

export function isSuccess<S>(r: Result<S, unknown>): r is Success<S> {
  return r.tag === "success";
}

export function isError<T extends Result.Any>(
  r: T,
): r is T & RError<Result.Error<T>> {
  return r.tag === "error";
}
