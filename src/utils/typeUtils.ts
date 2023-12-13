export type XOR<T extends unknown[], U = T[number]> = T extends [
  infer Head,
  ...infer Tail,
]
  ?
      | (Head & {
          [K in keyof U]?: K extends keyof Head ? Head[K] : never;
        })
      | XOR<Tail, U>
  : never;
