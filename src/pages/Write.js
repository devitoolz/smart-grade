import React, { useState } from 'react';
import { Ltable } from '../styles/LectureRoomCss';
import Input from '../components/Input';
const Write = () => {
  //공지사항  제목
  const [title, setTitle] = useState('');

  //공지사항 체크박스
  const [check, setCheck] = useState('unchecked');

  const handleCheck = e => {
    if (e.target.check) {
      setCheck(true);
    }
  };

  return (
    <Ltable>
      <colgroup>
        <col className="title" width={'20%'} />
        <col className="datail" width={'70%'} />
      </colgroup>

      <th>제목</th>
      <th className="inputTitle">
        <Input type="text" length="full" value={title} setValue={setTitle} />
      </th>
      <tr>
        <td className="leftTitle">
          <strong>상태</strong>
        </td>
        <td>
          <input type="checkbox" value={check} onClick={e => handleCheck(e)} />
        </td>
      </tr>
      <tr>
        <td className="leftTitle">
          <strong>내용</strong>
        </td>
        <td></td>
      </tr>
    </Ltable>
  );
};

export default Write;
