import React, { useState } from 'react';
import CommonModal from '../CommonModal';
import { GradeDemurProps } from '../../types/temp';
import { DemurTable } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';

const GradeDemur = ({ setDemur, studentId }: GradeDemurProps) => {
  const tableHeader = [
    { title: '학번', width: 1.5 },
    { title: '이름', width: 1 },
    { title: '학과', width: 2 },
    { title: '진행상태', width: 1 },
    { title: '처리', width: 1 },
  ];
  const tableBody = Array(10).fill('');

  return (
    <>
      <CommonModal setDisplay={setDemur} modalSize="big" modalTitle="이의 신청 목록">
        <mark>
          <q>
            <span>강의 {studentId}번 : </span>
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
              {tableBody?.map((_, idx) => {
                return (
                  <div className="table-body-item" key={idx}>
                    <div>{idx}</div>
                    <div>학생 {idx + 1}번</div>
                    <div>학생 소속 학과</div>
                    <div>처리중</div>
                    <div>
                      <CommonButton
                        value="처리하기"
                        btnType="table"
                        color="blue"
                        onClick={() => alert(idx)}
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
