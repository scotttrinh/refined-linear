import test from "ava";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

import { optionFromEmptyString } from "./option-from-empty-string";
import { isNone, isSome } from "fp-ts/lib/Option";

test("optionFromEmptyString", t => {
  t.true(
    pipe(
      "",
      optionFromEmptyString.decode,
      E.exists(isNone)
    )
  );
  t.true(
    pipe(
      "Not empty",
      optionFromEmptyString.decode,
      E.exists(val => isSome(val) && val.value === "Not empty")
    )
  );
});
