import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  // 게시판
  const editorRef = useRef<Editor>(null);
  const [title, setTitle] = useState('');
  const [boardContents, setBoardContents] = useState<string>('');
  const [importance, setImportance] = useState<string | number | null>('0');
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
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const toolbarCustom = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['image', 'link'],
  ];
  // TODO 이미지 업로드 관련
  let imageList: File[] = [];
  const [imgList, setImgList] = useState<Array<File>>([]);
  const handleUploadImage = (blob: any, callback: any) => {
    imageList.push(blob);
    const img = [...imageList];
    console.log(img);
    setImgList(img);
    console.log(imageList);
    console.log(imgList);

    const $btn = document.querySelector('.toastui-editor-close-button');
    ($btn as any)?.click();

    callback(URL.createObjectURL(blob));
  };
  const handleDeleteImage = (_idx: number) => {
    const aa = imageList.splice(_idx, 1);
    console.log(aa);
    console.log(imageList);
    setImgList(imageList);
  };

  // 공지사항 게시글 POST
  const handleBoardSave = () => {
    if (/^\s*$/.test(title)) {
      alert('제목을 입력해주세요');
      return;
    } else {
      setTitle(title.trim());
    }
    const markdownContent = editorRef.current?.getInstance().getMarkdown();
    console.log(markdownContent);
    console.log(imgList);
    if (/^\s*$/.test(markdownContent as string)) {
      alert('내용을 입력해주세요');
      return;
    } else {
      setBoardContents(markdownContent as string);
    }
    setSaveDisplay(true);
  };
  const handleBoardCancel = () => {
    setCancelDisplay(true);
    // navigate() // 이전페이지로 이동
  };
  const postBoardWait = async () => {
    await postBoard(title, boardContents, Number(importance as string), imgList);
  };

  // 저장+취소 버튼 클릭시 모달
  const [saveDisplay, setSaveDisplay] = useState(false);
  const [cancelDisplay, setCancelDisplay] = useState(false);
  const saveModalOk = async () => {
    await postBoardWait();
    setSaveDisplay(false);
    navigate('/admin/home/notice');
  };
  const saveModalCancel = () => setSaveDisplay(false);
  const cancelModalOk = () => navigate('/admin/home/notice');
  const cancelModalCancel = () => setCancelDisplay(false);

  // TSX
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
          <Dropdown
            data={statusList}
            value={importance}
            setValue={setImportance}
            length="short"
            placeholder="공지상태"
            reset={false}
          />
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
            {imgList?.map((item, idx) => {
              return (
                <div key={idx} className="file-item">
                  <span>{item?.name}</span>
                  <button onClick={() => handleDeleteImage(idx)}>X</button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="notice-content">
          <Editor
            ref={editorRef}
            placeholder="내용을 입력하세요"
            previewStyle="vertical"
            height="600px"
            useCommandShortcut={false}
            language="ko-KR"
            toolbarItems={toolbarCustom}
            hooks={{
              addImageBlobHook: handleUploadImage,
            }}
            // hideModeSwitch={true}
            // initialEditType="wysiwyg"
            // viewer={true} // TODO :나중에 다시 살펴보기
          />
        </div>
      </NoticeWrap>
    </>
  );
};

export default Write;
