export interface CommonModalProps {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  modalSize: 'small' | 'big';
  modalTitle: string;
  children?: React.ReactNode;
  handleModalOk?: Function;
  handleModalCancel?: Function;
}

export interface GradeDemurProps {
  setDemur: React.Dispatch<React.SetStateAction<boolean>>;
  studentId: number | null;
}
