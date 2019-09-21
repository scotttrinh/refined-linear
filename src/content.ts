import elementReady from "element-ready";

import { add, runSequence } from "./features";
import showBoardEstimation from "./features/show-board-estimation";
import showFullTitle from "./features/show-full-title";

const allFeatureTasks = [showFullTitle, showBoardEstimation].map(add);

elementReady("body.loaded", { stopOnDomReady: false }).then(() => {
  runSequence(allFeatureTasks).then(() => console.log("finished"));
  document.documentElement.classList.add("refined-linear");
});
