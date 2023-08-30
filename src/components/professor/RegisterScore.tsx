import React, { useEffect, useState } from 'react';
import { ModalStyle } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import { RegisterScoreProps } from '../../types/components';
import { RegisterScoreModal } from '../../styles/RegisterStyle';
import Input from '../Input';

const RegisterScore = ({ setOpenRegisterScore, score, setScore }: RegisterScoreProps) => {
  const [attendance, setAttendance] = useState<string>('0');
  const [midterm, setMidterm] = useState<string>('0');
  const [final, setFinal] = useState<string>('0');

  attendance === '' ? setAttendance('0') : null;
  midterm === '' ? setMidterm('0') : null;
  final === '' ? setFinal('0') : null;

  const total = parseInt(attendance) + parseInt(midterm) + parseInt(final);

  useEffect(() => {
    if (score) {
      setAttendance(score.attendance);
      setMidterm(score.midterm);
      setFinal(score.final);
    }
  }, [score]);

  const handleScoreChange = (
    setFn: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    const newValue = value.replace(/[^0-9]/g, '');
    if (parseInt(newValue) < 0 || parseInt(newValue) > 100) {
      alert('배점은 0 이상 100이하의 숫자만 가능합니다.');
    } else {
      setFn(newValue.startsWith('0') ? newValue.replace('0', '') : newValue);
    }
  };

  const handleConfirm = () => {
    if (total !== 100) {
      alert('배점을 확인해주세요.');
      return;
    }
    setScore({ attendance, midterm, final });
    setOpenRegisterScore(false);
  };

  const handleCancel = () => {
    setOpenRegisterScore(false);
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ height: 'auto', width: 'auto' }}>
        <div className="modal-title-small">
          <div>배점 등록</div>
        </div>
        <div className="modal-contents">
          <RegisterScoreModal total={total}>
            <div className="notice">
              <span>* 배점 비율은 총 100%가 되어야 합니다.</span>
              <span className="total">합계 : {total}%</span>
            </div>
            <div className="score-inputs">
              <div className="score">
                <span>출석</span>
                <Input
                  type="text"
                  length="tiny"
                  value={attendance || '0'}
                  setValue={e => handleScoreChange(setAttendance, e.target.value)}
                />
                <span>%</span>
              </div>
              <div className="score">
                <span>중간</span>
                <Input
                  type="text"
                  length="tiny"
                  value={midterm || '0'}
                  setValue={e => handleScoreChange(setMidterm, e.target.value)}
                />
                <span>%</span>
              </div>
              <div className="score">
                <span>기말</span>
                <Input
                  type="text"
                  length="tiny"
                  value={final || '0'}
                  setValue={e => handleScoreChange(setFinal, e.target.value)}
                />
                <span>%</span>
              </div>
            </div>
          </RegisterScoreModal>
        </div>
        <div className="modal-footer">
          <CommonButton value="확인" onClick={handleConfirm} btnType="modal" />
          <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default RegisterScore;
