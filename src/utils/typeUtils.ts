export type XOR<T, U> =
  | (T & {
      [K in keyof U]?: K extends keyof T ? T[K] : never;
    })
  | (U & {
      [K in keyof T]?: K extends keyof U ? U[K] : never;
    });
