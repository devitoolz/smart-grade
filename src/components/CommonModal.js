import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faX } from '@fortawesome/free-solid-svg-icons';

const CommonModal = ({
  setDisplay,
  contents,
  modalSize,
  modalTitle,
  children,
  handleModalOk,
  handleModalCancel,
}) => {
  console.log(contents);
  console.log(modalSize);

  // JSX
  return (
    <ModalStyle modalSize={modalSize}>
      <div className="modal-box">
        {modalSize === 'small' ? (
          <div className="modal-title-small">
            <div>{modalTitle}</div>
            <button onClick={() => setDisplay(false)}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </div>
        ) : (
          <div className="modal-title">
            <div>{contents?.lecture}</div>
            <button onClick={() => setDisplay(false)}>
              <FontAwesomeIcon icon={faX} size="lg" />
            </button>
          </div>
        )}
        <div className="modal-contents">{children}</div>

        <div className="modal-footer">
          <CommonButton
            value={modalSize === 'middle' ? '등록' : '확인'}
            onClick={() => {
              handleModalOk();
              setDisplay(false);
            }}
            btnType="modal"
          />
          <CommonButton
            value="취소"
            onClick={() => {
              handleModalCancel();
              setDisplay(false);
            }}
            btnType="modal"
          />
        </div>
      </div>
    </ModalStyle>
  );
};

export default CommonModal;
