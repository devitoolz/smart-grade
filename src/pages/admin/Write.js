import React, { useState } from 'react';
import { Ltable, Wbtns } from '../../styles/LectureRoomCss';
import Input from '../../components/Input';
import { Layout } from '../../styles/CommonStyle';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import { useNavigate } from 'react-router-dom';
const Write = () => {
  //공지사항  제목
  const [title, setTitle] = useState('');

  //공지사항 체크박스 value
  const [check, setCheck] = useState(false);

  //checkbox value change 함수
  const handleChangvalue = () => {
    setCheck(false);
  };

  //제목 인풋창?
  const handleTitle = e => {
    setTitle(e.target.value);
  };
  //임시
  const gogo = () => {
    console.log(gogo);
  };

  //저장 버튼 클릭시 모달오픈 여부
  const [saveDisplay, setSaveDisplay] = useState(false);

  //취소버튼 클릭시 모달오픈 여부
  const [cancelDisplay, setCancelDisplay] = useState(false);

  //save modal 확인 버튼 클릭시
  const saveModalOk = () => {
    setSaveDisplay(false);
    navigate('/admin/home/notice/');
  };
  //save modal 취소 버튼 클릭시
  const saveModalCancel = () => {
    setSaveDisplay(false);
  };

  //cancel modal 확인 버튼 클릭시
  const cancelModalOk = () => {
    navigate('/admin/home/notice/');
  };
  //cancel modal 취소 버튼 클릭시
  const cancelModalCancel = () => {
    setCancelDisplay(false);
  };
  //취소버튼 클릭시 공지사항 목록으로 이동
  const navigate = useNavigate();
  return (
    <>
      {saveDisplay === true ? (
        <CommonModal
          setDisplay={setSaveDisplay}
          modalSize="small"
          modalTitle="공지사항 작성"
          handleModalOk={saveModalOk}
          handleModalCancel={saveModalCancel}
        >
          <p>저장 하시겠습니까?</p>
        </CommonModal>
      ) : null}
      {cancelDisplay === true ? (
        <CommonModal
          setDisplay={cancelDisplay}
          modalSize="small"
          modalTitle="공지사항 작성"
          handleModalOk={cancelModalOk}
          handleModalCancel={cancelModalCancel}
        >
          <p>취소 하시겠습니까?</p>
        </CommonModal>
      ) : null}
      <Ltable>
        <colgroup>
          <col className="title" width={'30%'} />
          <col className="detail" width={'70%'} />
        </colgroup>
        <thead>
          <th>
            <h3>제목</h3>
          </th>
          <th className="inputTitle">
            <Input type="text" length="full" maxLength={20} value={title} setValue={handleTitle} />
          </th>
        </thead>
        <tbody>
          <tr>
            <td className="statusTitle">
              <h3>상태</h3>
            </td>
            <td className="importanceCheck">
              <input type="checkbox" value="1" />
              <div>
                <h3>중요</h3>
              </div>
              <p className="colorRed">* 체크 시 제일 상단 공지로 표시됩니다.</p>
            </td>
          </tr>
          <tr>
            <td className="fileTitle">
              <h3>첨부파일</h3>
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="contentTitle">
              <h3>내용</h3>
            </td>
            <td className="controlTextarea">
              <textarea name="content" id="content" cols="80" rows="20"></textarea>
            </td>
          </tr>
        </tbody>
      </Ltable>
      <Wbtns>
        <CommonButton btnType="page" value="저장" onClick={() => setSaveDisplay(true)} />
        <CommonButton btnType="page" value="취소" onClick={() => setCancelDisplay(true)} />
      </Wbtns>
    </>
  );
};

export default Write;
