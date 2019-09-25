import test from "ava";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

import { numberFromNullable } from "./number-from-nullable";

const toZero = numberFromNullable(0);

test("numberFromNullable", t => {
  t.true(
    pipe(
      null,
      toZero.decode,
      E.exists(val => val === 0)
    )
  );
  t.true(
    pipe(
      1,
      toZero.decode,
      E.exists(val => val === 1)
    )
  );
});
