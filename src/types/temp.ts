import React from 'react';

export interface CommonModalProps {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  modalSize: 'small' | 'big';
  modalTitle: string;
  children?: React.ReactNode;
  handleModalOk?: Function;
  handleModalCancel?: Function;
}

// 교수
export interface GradeDemurProps {
  setDemur: React.Dispatch<React.SetStateAction<boolean>>;
  lectureId: number | null;
}

/* * * * * * * * * * */

// 학생
export interface LectureInfoProps {
  setShowLectureInfo: React.Dispatch<React.SetStateAction<boolean>>;
  ilecture: number | null;
}
