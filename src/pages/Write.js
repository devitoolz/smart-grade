import React, { useState } from 'react';
import { Ltable } from '../styles/LectureRoomCss';
import Input from '../components/Input';
const Write = () => {
  //공지사항  제목
  const [title, setTitle] = useState('');

  //공지사항 체크박스
  const [check, setCheck] = useState();

  const handleCheck = e => {
    if (e.target.check) {
      setCheck(true);
    }
  };

  return;
};

export default Write;
