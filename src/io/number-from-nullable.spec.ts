import test from "ava";
import * as E from "fp-ts/lib/Either";

import { numberFromNullable } from "./number-from-nullable";

const toZero = numberFromNullable(0);

test("numberFromNullable#decode", t => {
  t.deepEqual(toZero.decode(null), E.right(0));
  t.deepEqual(toZero.decode(1), E.right(1));
  t.deepEqual(
    toZero.decode("Some string"),
    E.left([
      {
        value: "Some string",
        message: undefined,
        context: [{ actual: "Some string", key: "", type: toZero }]
      }
    ])
  );
});

test("numberFromNullable#encode", t => {
  t.deepEqual(toZero.encode(0), null);
  t.deepEqual(toZero.encode(1), 1);
});

test("numberFromNullable#is", t => {
  t.true(toZero.is(0));
  t.true(toZero.is(12));
  t.false(toZero.is("Some string"));
  t.false(toZero.is({}));
});
