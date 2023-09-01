import React, { useEffect, useRef, useState } from 'react';
import { ModalStyle } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import {
  LectureTimetableData,
  ObjectType,
  RegisterTimetableProps,
  TimetableData,
} from '../../types/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { RegisterTimetableModal } from '../../styles/RegisterStyle';
import { dayData } from '../../pages/professor/RegisterApply';
import api from '../../apis/api';
import { PulseLoader } from 'react-spinners';
import useQuerySearch from '../../hooks/useSearchFetch';

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
  const [usedTime, setUsedTime] = useState<Array<number>>([]);
  // const [pending, setPending] = useState(true);
  // const [error, setError] = useState(false);

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

  const numberToString = (number: number) => {
    if (number < 10) {
      return `0${number}:00`;
    } else {
      return `${number}:00`;
    }
  };

  const stringToNumber = (string: string) => {
    return parseInt(string.slice(0, 2));
  };

  const url = `/api/professor/lecture/room?ilectureRoom=${lectureRoom}`;

  const { data, pending, error } = useQuerySearch(url);

  useEffect(() => {
    let temp: Array<number> = [];

    (data as ObjectType)?.schedule.map((item: LectureTimetableData) => {
      const start = stringToNumber(item.startTime);
      const end = stringToNumber(item.endTime);
      const startKey = parseInt(
        Object.keys(timeData).find(key => timeData[parseInt(key)] === start) as string
      );
      for (let i = 0; i < end - start; i++) {
        temp.push(5 * startKey + item.dayWeek - 1 + 5 * i);
      }
    });

    setUsedTime(temp.sort((a, b) => a - b));
  }, [data]);

  useEffect(() => {
    const disableButton = (index: number) => {
      if (
        (selectedTime.length === 3 && !selectedTime.includes(index)) ||
        usedTime.includes(index) ||
        (selectedTime.length !== 0 && selectedTime[0] % 5 !== index % 5)
      ) {
        if (usedTime.includes(index)) {
          timeBtnRef.current?.[index].classList.add('already-used');
        }
        return true;
      }
      return false;
    };

    timeBtnRef.current?.forEach((button, index) => {
      button.disabled = disableButton(index);
    });
  }, [selectedTime, usedTime]);

  const handleTimeClick = (index: number) => {
    if (selectedTime.includes(index)) {
      setSelectedTime(selectedTime.filter(item => item !== index).sort((a, b) => a - b));
      timeBtnRef.current?.[index].classList.toggle('selected');
    } else {
      if (
        index > selectedTime[selectedTime.length - 1] + 5 ||
        index < selectedTime[0] - 5 ||
        index > selectedTime[0] + 10 ||
        index === selectedTime[1] - 15
      ) {
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
    } else if (selectedTime[selectedTime.length - 1] - selectedTime[selectedTime.length - 2] > 5) {
      alert('연속된 시간이어야 합니다.');
    } else {
      const week = (selectedTime[0] % 5) + 1;
      const startTime = numberToString(timeData[Math.floor(selectedTime[0] / 5)]); //몫
      const endTime = numberToString(
        timeData[Math.floor(selectedTime[selectedTime.length - 1] / 5)] + 1
      );

      const time = {
        week,
        startTime,
        endTime,
      };

      if (confirm(`${dayData[week]} ${startTime} ~ ${endTime} 가 맞습니까?`)) {
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
                {!error ? (
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
                    {pending && (
                      <div className="timetable-loading">
                        <PulseLoader color="#47b5ff" margin={6} size={12} speedMultiplier={0.7} />
                        <span>로딩 중...</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="timetable-error">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    <span>데이터를 불러오지 못했습니다.</span>
                  </div>
                )}
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
