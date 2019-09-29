import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import { select } from "./utils";
import { storage } from "./options-storage";

function init(): void {
  pipe(
    select('form'),
    O.fold(
      () => { throw new Error("Could not find options form!") },
      storage.syncForm
    )
  );
}

init();
