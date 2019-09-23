import { either } from "fp-ts/lib/Either";
import { getOrElse, none, Option, some } from "fp-ts/lib/Option";
import * as t from "io-ts";
import { option } from "io-ts-types/lib/option";

export interface OptionFromEmptyStringC
  extends t.Type<Option<string>, string, unknown> {}

export const optionFromEmptyString: OptionFromEmptyStringC = new t.Type(
  "OptionFromEmptyString",
  option(t.string).is,
  (u, c) =>
    either.chain(t.string.validate(u, c), s =>
      t.success(s === "" ? none : some(s))
    ),
  getOrElse(() => "")
);
