import test from "ava";
import * as E from "fp-ts/lib/Either";

import { numberFromNullable } from "./number-from-nullable";

const toZero = numberFromNullable(0);

test("numberFromNullable", t => {
  t.deepEqual(
    toZero.decode(null),
    E.right(0)
  );
  t.deepEqual(
    toZero.decode(1),
    E.right(1)
  );
});
