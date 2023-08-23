import React, { useState } from 'react';
import CommonModal from '../CommonModal';

const GradeDemur = ({ setDemur, studentId }) => {
  let [vanilla, setVanilla] = useState(0);
  return (
    <>
      <CommonModal setDisplay={setDemur} modalSize="big" modalTitle="이의 신청 목록">
        <mark>
          <q>
            <span>해당 과목의 이의신청 내역 확인 가능</span>
          </q>
        </mark>
        <button onClick={() => alert('click')}>click</button>
        <hr />
        <button onClick={() => setVanilla(vanilla - 1)}>－</button>
        <span>{vanilla}</span>
        <button onClick={() => setVanilla(vanilla + 1)}>＋</button>
        <hr />
      </CommonModal>
    </>
  );
};

export default GradeDemur;
