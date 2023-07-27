import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';

const CommonModal = ({ setDisplay, contents, modalSize, modalTitle }) => {
  console.log(contents);
  console.log(modalSize);
  // JSX
  return (
    <ModalStyle modalSize={modalSize}>
      <div className="modal-box">
        {modalSize === 'small' ? (
          <div className="modal-title-small">
            <div>{modalTitle}</div>
            <button onClick={() => setDisplay(false)}>X</button>
          </div>
        ) : (
          <p className="modal-title">{contents.lecture}</p>
        )}
        <div className="modal-contents">
          <p>modal contents</p>
        </div>

        <div className="modal-footer">
          <CommonButton value="확인" onClick={() => setDisplay(false)} btnType="modal" />
          <CommonButton value="취소" onClick={() => setDisplay(false)} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default CommonModal;
