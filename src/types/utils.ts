type Primitive = number | string | boolean | bigint | symbol | undefined | null;
type Builtin = Primitive | Function | Date | Error | RegExp;

/**
 * GraphQLの型からnullを取り除く
 * NOTE :ビルドでしかエラーにならない想定で使用する
 * @link - https://www.gaji.jp/blog/2022/09/02/10867/
 */
export type DeepNonNullable<T> = T extends Builtin
  ? NonNullable<T>
  : { [key in keyof T]-?: DeepNonNullable<T[key]> };
