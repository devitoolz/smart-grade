import React, { useEffect, useState } from 'react';
import { Button, FormTable, ImageUpload, Row } from '../../styles/UserStyle';
import {
  BookImage,
  ButtonContainer,
  InfoFormTable,
  LectureDescription,
  RegisterLayout,
} from '../../styles/RegisterStyle';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import RegisterTimetable from '../../components/professor/RegisterTimetable';
import { ObjectType } from '../../types/components';
import RegisterScore from '../../components/professor/RegisterScore';
import { DayData } from '../../types/pages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { LectureRoomData } from '../../types/apis';
import api from '../../apis/api';

export const dayData: DayData = {
  1: '월요일',
  2: '화요일',
  3: '수요일',
  4: '목요일',
  5: '금요일',
};

const RegisterApply = () => {
  const [openRegisterTimetable, setOpenRegisterTimetable] = useState<boolean>(false);
  const [openRegisterScore, setOpenRegisterScore] = useState<boolean>(false);
  const [lectureName, setLectureName] = useState<string>('');
  const [lectureRoom, setLectureRoom] = useState<string | number | null>(null);
  const [studentNum, setStudentNum] = useState<string>('');
  const [grade, setGrade] = useState<string | number | null>(null);
  const [credit, setCredit] = useState<string | number | null>(null);
  const [score, setScore] = useState<ObjectType | null>(null);
  const [time, setTime] = useState<ObjectType | null>(null);
  const [isbn, setIsbn] = useState<string>('');
  const [bookName, setBookName] = useState<string | null>(null);
  const [bookImg, setBookImg] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');

  const [lectureRoomList, setLectureRoomList] = useState<Array<LectureRoomData> | null>(null);
  const [prevLectureRoom, setPrevLectureRoom] = useState<string | number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getLectureRoomList = async () => {
      try {
        const { data } = await api.get<Array<LectureRoomData>>(`/api/lectureroom/list`);
        const newData = data.map(item => {
          return {
            ...item,
            lectureRoomName: item.lectureRoomName.concat('호'),
          };
        });
        setLectureRoomList(newData);
      } catch (err) {
        console.log(err);
      }
    };

    getLectureRoomList();
  }, []);

  useEffect(() => {
    if (lectureRoom !== '') {
      if (lectureRoom === prevLectureRoom) {
        return;
      }
      setOpenRegisterTimetable(true);
    } else {
      setTime(null);
      setPrevLectureRoom('');
    }
  }, [lectureRoom]);

  useEffect(() => {
    if (isbn.length === 13) {
      // TODO: 책 api
      console.log('책 API 요청');
    }
  }, [isbn]);

  const handleLecutreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLectureName(value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/g, ''));
  };

  const handleStudentNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStudentNum(value.replace(/[^0-9]/g, ''));
  };

  const handleIsbnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsbn(value.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = () => {
    const payload = {
      lectureName,
      lectureRoom,
      studentNum,
      grade,
      credit,
      ...score,
      ...time,
    };
    console.log(payload);
  };

  return (
    <>
      <RegisterLayout>
        <ButtonContainer>
          <Button onClick={handleSubmit}>생성</Button>
          <Button negative onClick={() => navigate(-1)}>
            취소
          </Button>
        </ButtonContainer>
        <FormTable>
          <Row col={2}>
            <div>강의명</div>
            <div>
              <Input
                type="text"
                isForm
                placeholder="강의명을 입력하세요."
                reset={setLectureName}
                value={lectureName}
                setValue={handleLecutreNameChange}
              />
            </div>
            <div>강의실</div>
            <div>
              <Dropdown
                isForm
                placeholder="강의실을 선택하세요."
                data={lectureRoomList}
                propertyName={{ key: 'ilectureRoom', value: 'lectureRoomName' }}
                value={lectureRoom}
                setValue={setLectureRoom}
                reset
                search
              />
            </div>
          </Row>
          <Row col={2}>
            <div>수강 인원 수</div>
            <div>
              <Input
                type="text"
                isForm
                placeholder="수강 인원을 입력하세요."
                reset={setStudentNum}
                value={studentNum}
                setValue={handleStudentNumChange}
              />
            </div>
            <div>학년 제한</div>
            <div>
              <Dropdown
                isForm
                placeholder="학년을 선택하세요."
                data={[
                  { id: 1, title: '1학년' },
                  { id: 2, title: '2학년' },
                  { id: 3, title: '3학년' },
                  { id: 4, title: '4학년' },
                ]}
                propertyName={{ key: 'id', value: 'title' }}
                value={grade}
                setValue={setGrade}
                reset
              />
            </div>
          </Row>
          <Row col={2}>
            <div>학점</div>
            <div>
              <Dropdown
                isForm
                placeholder="학점을 선택하세요."
                data={[
                  { id: 2, title: '2학점' },
                  { id: 3, title: '3학점' },
                  { id: 4, title: '4학점' },
                ]}
                propertyName={{ key: 'id', value: 'title' }}
                value={credit}
                setValue={setCredit}
                reset
              />
            </div>
            <div>배점</div>
            <div onClick={() => setOpenRegisterScore(true)}>
              {score ? (
                `출석 ${score.attendance}% / 중간 ${score.midterm}% / 기말 ${score.final}%`
              ) : (
                <span>배점을 등록하세요.</span>
              )}
            </div>
          </Row>
          <Row col={2}>
            <div>강의 기간</div>
            <div></div>
            <div>강의 시간</div>
            <div>
              {lectureRoom !== prevLectureRoom ? (
                <span>강의 시간 선택 중</span>
              ) : time ? (
                `${dayData[time.week]} / ${time.startTime} ~ ${time.endTime}`
              ) : (
                <span>(강의실 선택 필요)</span>
              )}
            </div>
          </Row>
        </FormTable>
        <InfoFormTable>
          <div className="row">
            <div>ISBN</div>
            <div>
              <Input
                type="text"
                isForm
                placeholder="교재의 ISBN 13자리를 입력하세요."
                maxLength={13}
                reset={setIsbn}
                value={isbn}
                setValue={handleIsbnChange}
              />
            </div>
          </div>
          <div className="row book-img">
            <div>교재 이미지</div>
            <div>
              <BookImage>
                {bookImg ? (
                  <img
                    src="https://shopping-phinf.pstatic.net/main_3247335/32473359191.20221019132422.jpg"
                    alt="교재 이미지"
                  />
                ) : (
                  <div className="no-book">
                    <FontAwesomeIcon icon={faBook} />
                    <span>교재가 없습니다.</span>
                  </div>
                )}
              </BookImage>
            </div>
          </div>
          <div className="row pt-2">
            <div>교재명</div>
            <div>{bookName ?? <span>교재가 없습니다.</span>}</div>
          </div>
          <div className="row pt-2">
            <div>강의 설명</div>
            <div>
              <LectureDescription
                placeholder="강의 설명을 입력하세요."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>
        </InfoFormTable>
      </RegisterLayout>
      {openRegisterTimetable && (
        <RegisterTimetable
          setOpenRegisterTimetable={setOpenRegisterTimetable}
          lectureRoom={lectureRoom}
          prevLectureRoom={prevLectureRoom}
          setLectureRoom={setLectureRoom}
          setPrevLectureRoom={setPrevLectureRoom}
          setTime={setTime}
        />
      )}
      {openRegisterScore && (
        <RegisterScore
          setOpenRegisterScore={setOpenRegisterScore}
          score={score}
          setScore={setScore}
        />
      )}
    </>
  );
};

export default RegisterApply;
