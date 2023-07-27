import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';

const CommonModal = ({ setDisplay, contents, modalSize, modalTitle, children }) => {
  console.log(contents);

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
          <div className="modal-title">
            <div>{contents.lecture}</div>
            <button onClick={() => setDisplay(false)}>X</button>
          </div>
        )}
        <div className="modal-contents">{children}</div>

        <div className="modal-footer">
          <CommonButton value="확인" onClick={() => setDisplay(false)} btnType="modal" />
          <CommonButton value="취소" onClick={() => setDisplay(false)} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default CommonModal;
