import { css } from "emotion";
import { constant, constTrue, constFalse } from "fp-ts/lib/function";
import * as Option from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { FeatureDetails } from "../features";

const OuterCardStyle = css`
    height: initial;
    min-height: 80px;
    padding: 16px;
`;
const CardTitleStyle = css`
    white-space: initial;
    overflow: visible;
`;

const addStyles = (issueEls: Element[]) => {
  issueEls.forEach((issueEl: Element) => {
    if (issueEl.classList.contains(OuterCardStyle)) {
      return;
    }

    issueEl.classList.add(OuterCardStyle);
    pipe(
      Option.fromNullable(issueEl.querySelector('span')),
      Option.map(el => el.classList.add(CardTitleStyle))
    );
  });
};

const init = async () => {
  const issueEls = Array.from(
    document.querySelectorAll('a[data-react-beautiful-dnd-draggable="0"]')
  );
  addStyles(issueEls);
};
const deinit = constant(Promise.resolve());
const include = [constTrue];
const exclude = [constFalse];

const showFullTitle: FeatureDetails = {
  init,
  deinit,
  include,
  exclude
};

export default showFullTitle;
