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
        <td className="importantCheck">
          <input type="checkbox" value="0" />
          <p>
            <strong>*중요</strong>
          </p>
        </td>
      </tr>
      <tr>
        <td>첨부파일</td>
        <td></td>
      </tr>
      <tr>
        <td className="leftTitle">
          <strong>내용</strong>
        </td>
        <td>
          <textarea name="hi" id="hi" cols="80" rows="20"></textarea>
        </td>
      </tr>
    </Ltable>
  );
};

export default Write;
