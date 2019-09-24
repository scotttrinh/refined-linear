import OptionsSync from "webext-options-sync";
import * as Either from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";

import { optionFromEmptyString } from "./io/option-from-empty-string";

export const rlOptions = t.type({
  token: optionFromEmptyString,
  teamId: optionFromEmptyString
});

export type RLOptions = t.TypeOf<typeof rlOptions>;

export const storage = new OptionsSync({
  storageName: "options",
  defaults: {
    token: "",
    teamId: ""
  },
  logging: false
});

export async function getAll(): Promise<RLOptions> {
  const options = await storage.getAll();

  return pipe(
    options,
    rlOptions.decode,
    Either.fold((err) => Promise.reject(err), (opts) => Promise.resolve(opts))
  );
}
