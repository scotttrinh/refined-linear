import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";

export function fromCard(cardEl: Element): O.Option<number> {
  return pipe(
    O.fromNullable(cardEl.getAttribute("href")),
    O.chain(href => O.fromNullable(href.match(/issue\/.+-(\d+)$/))),
    O.chain(matches => A.lookup(1, matches)),
    O.map(Number)
  );
}
