import OptionsSync from "webext-options-sync";
import { tryCatch } from "fp-ts/lib/TaskEither";
import * as Either from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";

import { optionFromEmptyString } from "./io/option-from-empty-string";

export const rlOptions = t.type({
  token: optionFromEmptyString,
  teamId: optionFromEmptyString
});

export type RLOptions = t.TypeOf<typeof rlOptions>;

interface RawRLOptions {
  token: string;
  teamId: string;
}

const storage = new OptionsSync({
  storageName: "options",
  defaults: {
    token: "",
    teamId: ""
  },
  logging: false
});

/**
 * Used for the webext-options-sync code. In most places, you probably want the
 * `getAll` function, which makes you deal with the empty-string initial case, and
 * ensures the structure of the data returned.
 */
export async function getRaw(): Promise<RawRLOptions> {
  return storage.getAll();
}

export function getAll(): Promise<RLOptions> {
  return pipe(
    tryCatch(getRaw, u => new Error(String(u))),
    rlOptions.decode,
    Either.fold((err) => Promise.reject(err), (opts) => Promise.resolve(opts))
  );
}
