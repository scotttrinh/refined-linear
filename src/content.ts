import { add, runSequence } from './features';
import showFullTitle from './features/show-full-title';
import showBoardEstimation from './features/show-board-estimation';

const allFeatureTasks = [
  showBoardEstimation,
  showFullTitle
].map(add);

runSequence(allFeatureTasks).then(() => console.log('finished'));
