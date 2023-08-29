import React, { useEffect, useRef, useState } from 'react';
import { ModalStyle } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import { DayData, RegisterTimetableProps, TimetableData } from '../../types/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { RegisterTimetableModal } from '../../styles/RegisterStyle';

const RegisterTimetable = ({
  setOpenRegisterTimetable,
  lectureRoom,
  prevLectureRoom,
  setLectureRoom,
  setPrevLectureRoom,
  setTime,
}: RegisterTimetableProps) => {
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

  const dayData: DayData = {
    0: '월요일',
    1: '화요일',
    2: '수요일',
    3: '목요일',
    4: '금요일',
  };

  const numberToString = (number: number) => {
    if (number < 10) {
      return `0${number}:00`;
    } else {
      return `${number}:00`;
    }
  };

  useEffect(() => {
    const disableButton = (index: number) => {
      if (
        (selectedTime.length === 3 && !selectedTime.includes(index)) ||
        data.includes(index) ||
        (selectedTime.length !== 0 && selectedTime[0] % 5 !== index % 5)
      ) {
        if (data.includes(index)) {
          timeBtnRef.current?.[index].classList.add('already-used');
        }
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

  const handleReset = () => {
    setSelectedTime([]);
    timeBtnRef.current?.forEach(button => {
      button.classList.remove('selected');
    });
  };

  const handleConfirm = () => {
    if (selectedTime.length === 0) {
      alert('최소 1시간 선택해야 합니다.');
    } else {
      const week = dayData[selectedTime[0] % 5];
      const startTime = numberToString(timeData[Math.floor(selectedTime[0] / 5)]);
      const endTime = numberToString(
        timeData[Math.floor(selectedTime[selectedTime.length - 1] / 5)] + 1
      );

      const time = {
        week,
        startTime,
        endTime,
      };

      if (confirm(`${week} ${startTime} ~ ${endTime} 가 맞습니까?`)) {
        setOpenRegisterTimetable(false);
        setTime(time);
        setPrevLectureRoom(lectureRoom);
      }
    }
  };

  const handleCancel = () => {
    setLectureRoom(prevLectureRoom !== '' ? prevLectureRoom : '');
    setOpenRegisterTimetable(false);
  };

  return (
    <>
      <ModalStyle modalSize="small">
        <div className="modal-box" style={{ width: 'auto', height: 'auto' }}>
          <div className="modal-title-small">
            <div>{lectureRoom} 강의실 시간표</div>
            <button onClick={handleCancel}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </div>
          <div className="modal-contents">
            <RegisterTimetableModal>
              <span className="notice">
                * 강의 시간은 3시간을 초과할 수 없으며, 최소 1시간을 선택하셔야 합니다.
              </span>
              <div className="timetable-help">
                <div>
                  <div className="already-used" />
                  사용 중
                </div>
                <div>
                  <div className="disabled" /> 선택 불가
                </div>
                <div>
                  <div className="selected" /> 선택됨 (최대 3시간)
                </div>
              </div>
              <div className="timetable-header">
                <div></div>
                <div>월요일</div>
                <div>화요일</div>
                <div>수요일</div>
                <div>목요일</div>
                <div>금요일</div>
              </div>
              <div className="timetable-content" style={{ display: 'flex' }}>
                <div className="timetable-time">
                  {Object.keys(timeData).map((item, index) => {
                    const time = timeData[parseInt(item)];
                    return (
                      <div key={index}>
                        <span>{parseInt(item) + 1}교시</span>
                        <span>{`(${numberToString(time)} ~ ${numberToString(time + 1)})`}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="timetable-btns">
                  {Array(45)
                    .fill('')
                    .map((_, index) => {
                      return (
                        <button
                          ref={el => {
                            if (el) {
                              timeBtnRef.current![index] = el;
                            }
                          }}
                          key={index}
                          onClick={() => handleTimeClick(index)}
                        ></button>
                      );
                    })}
                </div>
              </div>
            </RegisterTimetableModal>
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
