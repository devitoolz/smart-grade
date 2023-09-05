import React, { useState, useEffect } from 'react';
import CommonModal from '../CommonModal';
import { GradeDemurProps } from '../../types/temp';
import { DemurTable } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import { useLocation } from 'react-router-dom';
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

  return (
    <>
      <CommonModal setDisplay={setDemur} modalSize="big" modalTitle="이의 신청 목록">
        <mark>
          <q>
            <span>강의 {lectureId}번 : </span>
            <span>해당 과목의 이의신청 내역 확인 가능</span>
          </q>
        </mark>
        <button onClick={() => alert('click')}>click</button>
        <DemurTable>
          <div className="table">
            <div className="table-head">
              {tableHeader.map((item, idx) => {
                return <div key={idx}>{item.title}</div>;
              })}
            </div>
            <div className="table-body">
              {tableBody?.map((item: any) => {
                {
                  /**
              grade: "A+"
              studentName: "Allard"
              studentNum: 23300001
              totalScore: 100
              */
                }
                return (
                  <div className="table-body-item" key={item.studentNum}>
                    <div>{item.studentNum}</div>
                    <div>{item.studentName}</div>
                    <div>학생 소속 학과</div>
                    <div>{item.totalScore}</div>
                    <div>{item.grade}</div>
                    <div>
                      <CommonButton
                        value="처리하기"
                        btnType="table"
                        color="blue"
                        onClick={() => alert(item.studentNum)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DemurTable>
      </CommonModal>
    </>
  );
};

export default GradeDemur;
