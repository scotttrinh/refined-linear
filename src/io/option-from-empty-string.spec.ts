import test from "ava";
import * as O from "fp-ts/lib/Option";
import * as E from "fp-ts/lib/Either";

import { optionFromEmptyString } from "./option-from-empty-string";

test("optionFromEmptyString#decode", t => {
  t.deepEqual(optionFromEmptyString.decode(""), E.right(O.none));
  t.deepEqual(
    optionFromEmptyString.decode("Not empty"),
    E.right(O.some("Not empty"))
  );
});

test("optionFromEmptyString#encode", t => {
  t.deepEqual(optionFromEmptyString.encode(O.none), "");
  t.deepEqual(optionFromEmptyString.encode(O.some("Not empty")), "Not empty");
});

test("optionFromEmptyString#is", t => {
  t.true(optionFromEmptyString.is(O.none));
  t.true(optionFromEmptyString.is(O.some("Not empty")));
  t.false(optionFromEmptyString.is(O.some(12)));
  t.false(optionFromEmptyString.is({}));
});
