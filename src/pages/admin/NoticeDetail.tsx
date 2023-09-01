import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Wbtns } from '../../styles/LectureRoomCss';
import CommonButton from '../../components/CommonButton';
import useQuerySearch from '../../hooks/useSearchFetch';
import Input from '../../components/Input';
import CommonModal from '../../components/CommonModal';
import { putBoard } from '../../apis/fetch';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import Dropdown from '../../components/Dropdown';
import { ObjectType } from '../../types/components';
import { NoticeWrap } from '../../styles/NoticeStyle';

const NoticeDetail = () => {
  const navigate = useNavigate();

  // 게시글 불러오기
  const { pathname } = useLocation();
  const boardnum = pathname.split('/');
  const iboard = boardnum[boardnum.length - 1];
  const [click] = useState(false);
  const url = `/api/board/${iboard}`;
  const { data } = useQuerySearch(url, click);

  // 게시글 수정
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [ctnt, setCtnt] = useState('');
  const [importance, setImportance] = useState<string | number | null>('');
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleChangeCtnt = (e: React.ChangeEvent<HTMLInputElement>) => setCtnt(e.target.value);
  const handleEditBoard = () => {
    setEdit(true);
    setTitle((data as ObjectType).title);
    const contents = (data as ObjectType)?.ctnt;
    setCtnt(contents);
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTitle((data as ObjectType)?.title);
    const contents = (data as ObjectType)?.ctnt;
    setCtnt(contents);
    setImportance((data as ObjectType)?.importance + '');
    // data ? document.querySelector('button')?.click() : null;
    console.log(data);
  }, [data]);

  // 툴바 커스텀
  const toolbarCustom = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['image', 'link'],
  ];
  const editorRef = useRef<Editor>(null);
  // 모달창 오픈
  const [display, setDisplay] = useState(false);
  const putBoardWait = async () => {
    setDisplay(false);
    const markdownContent = editorRef.current?.getInstance().getMarkdown();
    await putBoard(Number(iboard), markdownContent as string, title, Number(importance));
    navigate('/admin/home/notice');
  };

  // 중요공지 드롭다운
  const statusList = [
    { id: '0', title: '일반공지' },
    { id: '1', title: '중요공지' },
  ];

  // JSX
  return (
    <>
      <NoticeWrap>
        <button className="disposable-btn" onClick={() => setLoading(true)}>
          버튼 클릭 시 글 보임 - 추후 수정 필요
        </button>
        <div className="notice-box">
          <div className="notice-title">
            {!edit ? (
              <>
                {importance === '1' ? (
                  <div className="status important">중요공지</div>
                ) : (
                  <div className="status">일반공지</div>
                )}
                <h2>{title}</h2>
              </>
            ) : (
              <>
                <Dropdown
                  length="short"
                  placeholder="일반공지"
                  data={statusList}
                  value={importance}
                  setValue={setImportance}
                  reset={false}
                />
                <Input
                  type="text"
                  length="full"
                  placeholder="제목 (최대 50자)"
                  maxLength={50}
                  value={title}
                  setValue={e => setTitle(e.target.value)}
                />
              </>
            )}
          </div>
          <span>작성일 | 2023-00-00</span>
          {/* 내용 */}
          <div className="notice-view-area">
            {loading &&
              (!edit ? (
                <div className="notice-viewer">
                  <Viewer initialValue={ctnt} />
                </div>
              ) : (
                <div className="notice-content">
                  <Editor
                    ref={editorRef}
                    placeholder="내용을 입력하세요"
                    initialValue={ctnt}
                    previewStyle="vertical"
                    height="650px"
                    useCommandShortcut={false}
                    language="ko-KR"
                    toolbarItems={toolbarCustom}
                    // hooks={{
                    //   addImageBlobHook: handleUploadImage,
                    // }}
                    // hideModeSwitch={true}
                    // initialEditType="wysiwyg"
                    // viewer={true} // 나중에 다시 살펴보기
                  />
                </div>
              ))}
          </div>
        </div>
        <Wbtns>
          {!edit ? (
            <>
              <CommonButton value="수정하기" btnType="page" onClick={() => handleEditBoard()} />
              <CommonButton value="뒤로가기" btnType="page" onClick={() => navigate(-1)} />
            </>
          ) : (
            <>
              <CommonButton
                value="수정완료"
                btnType="page"
                color="blue"
                textColor="white"
                onClick={() => setDisplay(true)}
              />
              <CommonButton
                value="취소하기"
                btnType="page"
                color="red"
                textColor="white"
                onClick={() => setEdit(false)}
              />
            </>
          )}
        </Wbtns>
      </NoticeWrap>
      {display && (
        <CommonModal
          setDisplay={setDisplay}
          modalSize="small"
          modalTitle="게시글 수정"
          handleModalOk={() => putBoardWait()}
          handleModalCancel={() => setDisplay(false)}
        >
          게시글 수정을 완료하시겠습니까?
        </CommonModal>
      )}
    </>
  );
};

export default NoticeDetail;
