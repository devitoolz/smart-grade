import React, { useEffect, useRef, useState } from 'react';
import { ModalStyle } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import { LectureRegister, TimetableData } from '../../types/components';
import styled from '@emotion/styled';

const Button = styled.button`
  border: none;
  background: white;
  width: 100%;
  height: 100%;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  &:active {
    background: lightgray;
  }
  &:disabled {
    background: gray;
  }
  &.selected {
    background: lightblue;
  }
  &.otherday {
    background: pink;
  }
`;

const RegisterTimetable = ({ setOpenRegister, setLectureRoom }: LectureRegister) => {
  const [selectedTime, setSelectedTime] = useState<Array<number>>([]);
  const timeBtnRef = useRef<Array<HTMLButtonElement> | null>([]);

  // TODO: 추후 api로 가져올 예정
  const data = [5, 10, 15, 20, 3, 8, 13, 18];

  const timeData: TimetableData = {
    0: 9,
    1: 10,
    2: 11,
    3: 12,
    4: 13,
    5: 14,
    6: 15,
    7: 16,
    8: 17,
  };

  useEffect(() => {
    const disableButton = (index: number) => {
      if (
        (selectedTime.length === 3 && !selectedTime.includes(index)) ||
        data.includes(index) ||
        (selectedTime.length !== 0 && selectedTime[0] % 5 !== index % 5)
      ) {
        return true;
      }
      return false;
    };

    timeBtnRef.current?.forEach((button, index) => {
      button.disabled = disableButton(index);
    });
  }, [selectedTime]);

  const handleTimeClick = (index: number) => {
    if (selectedTime.includes(index)) {
      setSelectedTime(selectedTime.filter(item => item !== index).sort((a, b) => a - b));
      timeBtnRef.current?.[index].classList.toggle('selected');
    } else {
      if (index > selectedTime[selectedTime.length - 1] + 5 || index < selectedTime[0] - 5) {
        alert('연속된 시간이어야 합니다.');
      } else {
        timeBtnRef.current?.[index].classList.toggle('selected');
        setSelectedTime([...selectedTime, index].sort((a, b) => a - b));
      }
    }
  };

  const handleConfirm = () => {
    if (selectedTime.length === 0) {
      alert('최소 1시간 선택');
    } else {
      const week = selectedTime[0] % 5;
      const startTime = timeData[Math.floor(selectedTime[0] / 5)];
      const endTime = timeData[Math.floor(selectedTime[selectedTime.length - 1] / 5)] + 1;

      const payload = {
        week,
        startTime,
        endTime,
      };

      alert(JSON.stringify(payload));
      setOpenRegister(false);
    }
  };

  const handleCancel = () => {
    setLectureRoom('');
    setOpenRegister(false);
  };

  return (
    <>
      <ModalStyle modalSize="small">
        <div className="modal-box" style={{ width: 1000, height: 800 }}>
          <div className="modal-title-small">
            <div>강의 개설 신청</div>
          </div>
          <div className="modal-contents">
            <div>
              <div
                style={{
                  background: 'red',
                  display: 'grid',
                  height: 50,
                  placeItems: 'center',
                  gridTemplateColumns: 'repeat(6, 100px)',
                }}
              >
                <div></div>
                <div>월요일</div>
                <div>화요일</div>
                <div>수요일</div>
                <div>목요일</div>
                <div>금요일</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    background: 'red',
                    display: 'grid',
                    width: 100,
                    placeItems: 'center',
                    gridTemplateRows: 'repeat(9, 50px)',
                  }}
                >
                  <div>09:00 ~ 10:00</div>
                  <div>10:00 ~ 11:00</div>
                  <div>11:00 ~ 12:00</div>
                  <div>12:00 ~ 13:00</div>
                  <div>13:00 ~ 14:00</div>
                  <div>14:00 ~ 15:00</div>
                  <div>15:00 ~ 16:00</div>
                  <div>16:00 ~ 17:00</div>
                  <div>17:00 ~ 18:00</div>
                </div>
                <div
                  style={{
                    background: 'skyblue',
                    display: 'grid',
                    gridTemplate: 'repeat(9, 50px) / repeat(5, 100px)',
                    placeItems: 'center',
                    borderTop: '1px solid black',
                    borderLeft: '1px solid black',
                  }}
                >
                  {Array(45)
                    .fill('')
                    .map((_, index) => {
                      return (
                        <Button
                          ref={el => {
                            if (el) {
                              timeBtnRef.current![index] = el;
                            }
                          }}
                          key={index}
                          onClick={() => handleTimeClick(index)}
                        ></Button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <CommonButton value="확인" onClick={handleConfirm} btnType="modal" />
            <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
          </div>
        </div>
      </ModalStyle>
    </>
  );
};

export default RegisterTimetable;
