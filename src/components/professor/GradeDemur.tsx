import React, { useState, useEffect } from 'react';
import CommonModal from '../CommonModal';
import { GradeDemurProps } from '../../types/temp';
import { DemurTable } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import api from '../../apis/api';
import { getObjectionList, putObjection } from '../../apis/professorGrade';

const GradeDemur = ({ setDemur, lectureId }: GradeDemurProps) => {
  const tableHeader = [
    { title: '학번', width: 1.5 },
    { title: '이름', width: 1 },
    { title: '학과', width: 2 },
    { title: '성적', width: 1 },
    { title: '등급', width: 1 },
    { title: '처리', width: 1 },
  ];
  const [tableBody, setTableBody] = useState([]);
  const getObjectionListWait = async () => {
    await getObjectionList(lectureId, setTableBody);
  };
  useEffect(() => {
    getObjectionListWait();
  }, []);
  const putObjectionWait = async (ilectureStudent: number) => {
    const objectionUrl = `/api/professor/grade/objection?ilecture=${lectureId}&ilectureStudent=${ilectureStudent}&newObjection=2`;
    const result = await putObjection(objectionUrl);
    result ? setDemur(false) : null;
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
                        onClick={() => putObjectionWait(item.ilectureStudent)}
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
