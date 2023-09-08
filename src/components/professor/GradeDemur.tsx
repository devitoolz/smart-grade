import React, { useState, useEffect } from 'react';
import CommonModal from '../CommonModal';
import { GradeDemurProps } from '../../types/temp';
import { DemurTable } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import api from '../../apis/api';

const GradeDemur = ({ setDemur, lectureId }: GradeDemurProps) => {
  const tableHeader = [
    { title: '학번', width: 1.5 },
    { title: '이름', width: 1 },
    { title: '학과', width: 2 },
    { title: '성적', width: 1 },
    { title: '등급', width: 1 },
    { title: '처리', width: 1 },
  ];
  // const tableBody = Array(10).fill('');
  const [tableBody, setTableBody] = useState([]);
  const url = `/api/professor/objection?ilecture=${lectureId}&objection=1`;
  const getLectureList = async () => {
    try {
      const { data } = await api.get(url);
      setTableBody(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLectureList();
  }, []);
  // XXX api 연동 - 파일 분리
  const putObjection = async (ilectureStudent: number) => {
    const objectionUrl = `/api/professor/grade/objection?ilecture=${lectureId}&ilectureStudent=${ilectureStudent}&newObjection=2`;
    try {
      const result = await api.put(objectionUrl);
      console.log(result);
      alert('성공');
      setDemur(false);
    } catch (err) {
      console.log(err);
      alert('실패');
    }
  };

  return (
    <>
      <CommonModal setDisplay={setDemur} modalSize="big" modalTitle="이의 신청 목록">
        <DemurTable>
          <div className="table">
            <div className="table-head">
              {tableHeader.map((item, idx) => {
                return <div key={idx}>{item.title}</div>;
              })}
            </div>
            <div className="table-body">
              {tableBody?.map((item: any) => {
                return (
                  <div className="table-body-item" key={item.studentNum}>
                    <div>{item.studentNum}</div>
                    <div>{item.studentName}</div>
                    <div>{item.majorName}</div>
                    <div>{item.totalScore}</div>
                    <div>{item.grade}</div>
                    <div>
                      <CommonButton
                        value="처리하기"
                        btnType="table"
                        color="blue"
                        onClick={() => putObjection(item.ilectureStudent)}
                      />
                    </div>
                  </div>
                );
              })}
              {tableBody?.length < 10 ? (
                <>
                  {Array(10 - tableBody?.length)
                    .fill('')
                    .map((_, idx) => (
                      <div className="table-body-item" key={idx}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ))}
                </>
              ) : (
                'null'
              )}
            </div>
          </div>
        </DemurTable>
      </CommonModal>
    </>
  );
};

export default GradeDemur;
