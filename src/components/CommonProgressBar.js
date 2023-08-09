import { CircularProgressBar } from '@tomickigrzegorz/react-circular-progress-bar';

const CommonProgressBar = ({ maxScore, nowScore }) => {
  const percentage = Math.round((nowScore / maxScore) * 100);
  console.log(percentage);
  return (
    <div style={{ width: '50%', height: '100%', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <CircularProgressBar
          colorCircle="#f1f1f1"
          colorSlice="#880E4F"
          fontSize="10px"
          percent={75}
          textPosition="1.5rem"
        ></CircularProgressBar> */}
        <CircularProgressBar
          colorCircle="#F8F8F8"
          colorSlice="#1363df"
          fill="#F8F8F8"
          fontWeight={0}
          fontSize="10px"
          percent={percentage}
          textPosition="1.5rem"
          size={280}
          stroke={4}
          strokeBottom={1}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          fontSize: 18,
          transform: `translate(-50%, -100%)`,
        }}
      >
        {nowScore} / {maxScore}
      </div>
      <div style={{ lineHeight: 2, textAlign: 'right' }}>현재 이수 학점 / 졸업 학점</div>
    </div>
  );
};
export default CommonProgressBar;
