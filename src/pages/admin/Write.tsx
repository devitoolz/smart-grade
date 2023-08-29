import React, { useRef, useState } from 'react';
import { Ltable, Wbtns } from '../../styles/LectureRoomCss';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import { useNavigate } from 'react-router-dom';
import { postBoard } from '../../apis/fetch';
// toast ui
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { NoticeWrap } from '../../styles/NoticeStyle';
import Dropdown from '../../components/Dropdown';

const Write = () => {
  const navigate = useNavigate();

  //공지사항 제목
  const [title, setTitle] = useState('');
  //제목 인풋창
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  //저장+취소 버튼 클릭시 모달오픈 여부
  const [saveDisplay, setSaveDisplay] = useState(false);
  const [cancelDisplay, setCancelDisplay] = useState(false);
  //save modal 확인 버튼 클릭시
  const saveModalOk = async () => {
    await postBoardWait();
    setSaveDisplay(false);
    navigate('/admin/home/notice/');
  };
  //save modal 취소 버튼 클릭시
  const saveModalCancel = () => setSaveDisplay(false);
  //cancel modal 확인 버튼 클릭시
  const cancelModalOk = () => navigate('/admin/home/notice/');
  //cancel modal 취소 버튼 클릭시
  const cancelModalCancel = () => setCancelDisplay(false);

  // 공지사항 POST
  const [boardContents, setBoardContents] = useState<string>('');
  // const boardArea = e => setBoardContents(e.target.value);
  const postBoardWait = async () => {
    // const $check = document.getElementById('check') as HTMLInputElement | null;
    // const isChecked = $check?.checked ? 1 : 0;

    await postBoard(title, boardContents, parseInt(checked as string));
  };

  // 게시판
  // const editorRef = useRef<HTMLElement | null>(null);
  const editorRef = useRef<Editor>(null);
  // 이미지 업로드 관련
  const [imgList, setImgList] = useState([]);
  // 툴바 커스텀
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['table', 'image', 'link'],
  ];
  // 공지상태
  const statusList = [
    {
      id: '0',
      title: '일반공지',
    },
    {
      id: '1',
      title: '중요공지',
    },
  ];
  const [checked, setChecked] = useState<string | number | null>('0');

  // 게시글 작성
  const handleBoardSave = () => {
    const markdownContent = editorRef.current?.getInstance().getMarkdown();
    setBoardContents(markdownContent as string);
    setSaveDisplay(true);
  };
  const handleBoardCancel = () => {
    setCancelDisplay(true);
    // navigate() // 이전페이지로 이동
  };

  // JSX
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
          setDisplay={setCancelDisplay}
          modalSize="small"
          modalTitle="공지사항 작성"
          handleModalOk={cancelModalOk}
          handleModalCancel={cancelModalCancel}
        >
          <p>취소 하시겠습니까?</p>
        </CommonModal>
      ) : null}
      <NoticeWrap>
        <div className="notice-header">
          <h3>게시판 글쓰기</h3>
          <div className="notice-btn">
            <CommonButton
              btnType="table"
              color="blue"
              value="저장"
              onClick={() => handleBoardSave()}
            />
            <CommonButton
              btnType="table"
              color="red"
              value="취소"
              onClick={() => handleBoardCancel()}
            />
          </div>
        </div>
        <div className="notice-title">
          <Dropdown data={statusList} value={checked} setValue={setChecked} />
          <Input
            type="text"
            length="full"
            placeholder="제목 (최대 50자)"
            maxLength={50}
            value={title}
            setValue={handleTitle}
          />
        </div>
        <div className="notice-file">
          <span>첨부파일</span>
          <div className="file-list">
            <div className="file-item">
              <span>aaa.png</span>
              <button>X</button>
            </div>
            <div className="file-item">
              <span>bbb.png</span>
              <button>X</button>
            </div>
          </div>
        </div>
        <div className="notice-content">
          <Editor
            ref={editorRef}
            placeholder="내용을 입력하세요"
            // initialValue=""
            previewStyle="vertical"
            height="600px"
            useCommandShortcut={false}
            language="ko-KR"
            toolbarItems={toolbarItems}
            // hooks={{
            //   addImageBlobHook: handleUploadImage,
            // }}
            // hideModeSwitch={true}
            // initialEditType="wysiwyg"
            // viewer={true} // 나중에 다시 살펴보기
          />
        </div>
      </NoticeWrap>
    </>
  );
};

export default Write;
