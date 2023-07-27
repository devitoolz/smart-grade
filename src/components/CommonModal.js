import { TempStyle } from '../styles/MyStyleCSS';

const CommonModal = ({ setDisplay, contents }) => {
  console.log(contents);
  // JSX
  return (
    <TempStyle>
      <div className="modal-box">
        <p>{contents.lecture}</p>
        <div>
          <button onClick={() => setDisplay(false)}>확인</button>
          <button onClick={() => setDisplay(false)}>취소</button>
        </div>
      </div>
    </TempStyle>
  );
};
export default CommonModal;
