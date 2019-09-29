import test from "ava";
import * as O from "fp-ts/lib/Option";
import * as E from "fp-ts/lib/Either";

import { optionFromEmptyString } from "./option-from-empty-string";

test("optionFromEmptyString", t => {
  t.deepEqual(
    optionFromEmptyString.decode(""),
    E.right(O.none)
  );
  t.deepEqual(
    optionFromEmptyString.decode("Not empty"),
    E.right(O.some("Not empty"))
  );
});
