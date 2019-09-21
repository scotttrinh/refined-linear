import { constant, constTrue, constFalse } from "fp-ts/lib/function";
import * as Option from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import * as selectors from "../selectors";
import * as when from "../when";
import { FeatureDetails } from "../features";
import "./show-full-title.css";

const addStyles = (issueEls: Element[]) => {
  issueEls.forEach((issueEl: Element) => {
    if (issueEl.classList.contains("rl__issue-title__container")) {
      return;
    }

    issueEl.classList.add("rl__issue-title__container");
    pipe(
      Option.fromNullable(issueEl.querySelector("span")),
      Option.map(el => el.classList.add("rl__issue-title__title"))
    );
  });
};

const doShowFullTitle = async () => {
  const issueEls = Array.from(document.querySelectorAll(selectors.CARD));
  addStyles(issueEls);
};
const undo = constant(Promise.resolve());
const include = [constTrue];
const exclude = [constFalse];

const showFullTitle: FeatureDetails = {
  id: 'show-full-title',
  when: when.locationChanges,
  do: doShowFullTitle,
  undo,
  include,
  exclude
};

export default showFullTitle;
