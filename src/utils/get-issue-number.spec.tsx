import React from "dom-chef";
import test from "ava";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import { fromCard } from "./get-issue-number";

import '../test-helpers/setup';

const issueAnchorElement = ((
  <a href="https://linear.app/issue/FOO-12" />
) as unknown) as Element;
const otherAnchorElement = ((
  <a href="https://example.com/something/with/a/number/12" />
) as unknown) as Element;

test("fromCard", t => {
  t.true(
    pipe(
      issueAnchorElement,
      fromCard,
      O.exists(val => val === 12)
    )
  );
  t.false(
    pipe(
      otherAnchorElement,
      fromCard,
      O.isNone
    )
  );
});
