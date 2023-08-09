import { ScoreProgressBar } from '../styles/MyStyleCSS';

const CommonProgressBar = ({ maxScore, nowScore }) => {
  return (
    <div>
      <ScoreProgressBar />
      <div>
        {maxScore} / {nowScore}
      </div>
    </div>
  );
};
export default CommonProgressBar;
