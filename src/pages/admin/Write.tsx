import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Dropdown from '../../components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faX } from '@fortawesome/free-solid-svg-icons';
import { postBoard } from '../../apis/fetch';
// toast ui
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { NoticeWrap } from '../../styles/NoticeStyle';

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
  // XXX 이미지 업로드 관련 ~ 지우고 다시 추가하면 이전 값도 다시 추가되는 문제
  const [imgList, setImgList] = useState<Array<File>>([]);
  const [imgBlobUrlList, setImgBlobUrlList] = useState<Array<string>>([]);
  const handleUploadImage = (blob: any) => {
    // 이전 상태를 가져와서 새 상태를 설정
    setImgList((prev: Array<File>) => [...prev, blob]);
    setImgBlobUrlList((prev: Array<string>) => [...prev, URL.createObjectURL(blob)]);

    const $btn = document.querySelector('.toastui-editor-close-button');
    ($btn as any)?.click();
  };
  const handleDeleteImage = (_idx: number) => {
    const tempList: Array<File> = imgList.filter((_, index) => index !== _idx);
    setImgList(tempList);
    const imgUrl: Array<string> = imgBlobUrlList.filter((_, index) => index !== _idx);
    setImgBlobUrlList(imgUrl);
  };

  // 공지사항 게시글 POST
  const handleBoardSave = () => {
    if (/^\s*$/.test(title)) {
      alert('제목을 입력하세요');
      return;
    } else {
      setTitle(title.trim());
    }
    const markdownContent = editorRef.current?.getInstance().getMarkdown();
    console.log(markdownContent);
    console.log(imgList);
    if (/^\s*$/.test(markdownContent as string)) {
      alert('내용을 입력하세요');
      return;
    } else {
      setBoardContents(markdownContent as string);
    }
    setSaveDisplay(true);
  };
  const handleBoardCancel = () => {
    setCancelDisplay(true);
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
        <div className="notice-container-box">
          <div>
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
            <div className="notice-content">
              <Editor
                ref={editorRef}
                placeholder="내용을 입력하세요"
                previewStyle="vertical"
                height="650px"
                useCommandShortcut={false}
                language="ko-KR"
                toolbarItems={toolbarCustom}
                hooks={{
                  addImageBlobHook: handleUploadImage,
                }}
                hideModeSwitch={true}
                initialEditType="wysiwyg"
                // viewer={true} // TODO :나중에 다시 살펴보기
              />
            </div>
          </div>

          <div className="notice-image-area">
            <div>
              <div className="notice-upload">
                <div>첨부파일</div>
                <div className="file-list">
                  {imgList?.map((item, idx) => {
                    return (
                      <div key={idx} className="file-item">
                        <span>{item?.name}</span>
                        {/* XXX X 버튼 모양 바꾸기 */}
                        <button onClick={() => handleDeleteImage(idx)}>
                          <FontAwesomeIcon icon={faXmark} size="lg" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="notice-prev-show">
                <div>
                  {imgBlobUrlList.length === 0 ? (
                    <span>이미지 미리보기</span>
                  ) : (
                    imgBlobUrlList?.map((item, idx) => {
                      return (
                        <div key={idx} className="file-prev-item">
                          <img src={item} alt={`미리보기 ${idx + 1}`} />
                          <button onClick={() => handleDeleteImage(idx)}>
                            <FontAwesomeIcon icon={faX} size="lg" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </NoticeWrap>
    </>
  );
};

export default Write;
