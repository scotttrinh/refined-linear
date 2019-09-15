import { add, runSequence } from './features';
import './features/show-full-title.css';
import showBoardEstimation from './features/show-board-estimation';

const allFeatureTasks = [
  showBoardEstimation
].map(add);

runSequence(allFeatureTasks).then(() => console.log('finished'));
