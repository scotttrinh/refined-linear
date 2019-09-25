import * as t from "io-ts";

export function numberFromNullable(whenNull: number) {
  return new t.Type(
    "nullableNumberToEstimate",
    t.number.is,
    (input, context) =>
      t.number.is(input)
        ? t.success(input)
        : input === null
        ? t.success(whenNull)
        : t.failure(input, context),
    (input: number) => (input === whenNull ? null : input)
  );
}
