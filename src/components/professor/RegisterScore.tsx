import React from 'react';
import { ModalStyle } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import { RegisterScoreProps } from '../../types/components';
import { RegisterScoreModal } from '../../styles/RegisterStyle';
import Input from '../Input';

const RegisterScore = ({
  setOpenRegisterScore,
  score,
  prevScore,
  setScore,
  setPrevScore,
}: RegisterScoreProps) => {
  const handleCancel = () => {
    // setScore(!prevScore ? prevScore : null);
    setOpenRegisterScore(false);
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ height: 'auto', width: 'auto' }}>
        <div className="modal-title-small">
          <div>배점 등록</div>
        </div>
        <div className="modal-contents">
          <RegisterScoreModal>
            <span className="notice">* 배점 비율은 총 100%가 되어야 합니다.</span>
            <div className="score-inputs">
              <div className="score">
                <span>출석</span>
                <Input
                  type="number"
                  length="tiny"
                  // reset={setId}
                  // value={id}
                  // setValue={e => setId(e.target.value)}
                />
              </div>
              <div className="score">
                <span>중간</span>
                <Input
                  type="number"
                  length="tiny"
                  // reset={setId}
                  // value={id}
                  // setValue={e => setId(e.target.value)}
                />
              </div>
              <div className="score">
                <span>기말</span>
                <Input
                  type="number"
                  length="tiny"
                  // reset={setId}
                  // value={id}
                  // setValue={e => setId(e.target.value)}
                />
              </div>
            </div>
          </RegisterScoreModal>
        </div>
        <div className="modal-footer">
          <CommonButton value="확인" btnType="modal" />
          <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default RegisterScore;
