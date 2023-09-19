import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Wbtns } from '../styles/LectureRoomCss';
import CommonButton from '../components/CommonButton';
import useQuerySearch from '../hooks/useSearchFetch';
import Input from '../components/Input';
import CommonModal from '../components/CommonModal';
import { putBoard } from '../apis/board';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import Dropdown from '../components/Dropdown';
import { ObjectType } from '../types/components';
import { NoticeLoading, NoticeWrap } from '../styles/NoticeStyle';
import { FadeLoader } from 'react-spinners';

const NoticeDetail = () => {
  const navigate = useNavigate();

  // 관리자모드 확인
  const location = useLocation();
  const [adminMode, setAdminMode] = useState<boolean>(false);
  useEffect(() => {
    const adminCheck = location.pathname.split('/').includes('admin');
    adminCheck ? setAdminMode(true) : null;
  }, []);

  // 게시글 불러오기
  const { pathname } = useLocation();
  const boardnum = pathname.split('/');
  const iboard = boardnum[boardnum.length - 1];
  const [click] = useState(false);
  const url = `${process.env.REACT_APP_API_URL}/api/board/${iboard}`;
  const { data } = useQuerySearch(url, click);
  const settingBoard = () => {
    setTitle((data as ObjectType)?.title);
    const contents = (data as ObjectType)?.ctnt;
    setCtnt(contents);
    const picList = (data as ObjectType)?.pisc;
    setPisc(picList);
    setImportance((data as ObjectType)?.importance + '');
  };
  const makeTimer = () => {
    setTimeout(() => {
      setLoading(true);
    }, 500);
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    settingBoard();
    // toast Editor View 값 강제 출력 : API 수정 필요
    data ? makeTimer() : null;
  }, [data]);

  // 게시글 수정
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [ctnt, setCtnt] = useState('');
  const [pisc, setPisc] = useState<any>([]);
  const [importance, setImportance] = useState<string | number | null>('');
  const [delActivate, setDelActivate] = useState(false);
  const handleEditBoard = () => {
    const $temp = document.querySelector('.disposable-btn');
    ($temp as any)?.click();
    setEdit(true);
    setDelActivate(true);
    settingBoard();
  };
  const [addNewPic, setAddNewPic] = useState<Array<File>>([]);
  const [showNewPic, setShowNewPic] = useState<Array<string>>([]);
  const handleUploadImageNew = (blob: any) => {
    // 이전 상태를 가져와서 새 상태를 설정
    setAddNewPic((prev: Array<File>) => [...prev, blob]);
    setShowNewPic((prev: Array<string>) => [...prev, URL.createObjectURL(blob)]);

    const $btn = document.querySelector('.toastui-editor-close-button');
    ($btn as any)?.click();
  };
  const handleDeleteImageNew = (_idx: number) => {
    const check = confirm('해당 이미지를 삭제하시겠습니까?');
    if (check) {
      const tempList: Array<File> = addNewPic.filter((_, index) => index !== _idx);
      setAddNewPic(tempList);
      const imgUrl: Array<string> = showNewPic.filter((_, index) => index !== _idx);
      setShowNewPic(imgUrl);
    }
  };
  const [deletePicList, setDeletePicList] = useState<Array<number>>([]);
  const handleDeletePics = (ipic: number) => {
    const check = confirm('해당 이미지를 삭제하시겠습니까?');
    if (check) {
      setDeletePicList((prev: Array<number>) => [...prev, ipic]);
      const picList: Array<any> = pisc.filter((item: any) => item.ipic !== ipic);
      setPisc(picList);
    }
  };
  // 툴바 커스텀
  const toolbarCustom = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['image', 'link'],
  ];
  const editorRef = useRef<Editor>(null);
  const [display, setDisplay] = useState(false);
  // 게시글 수정 PUT 통신
  const putBoardWait = async () => {
    setDisplay(false);
    const markdownContent = editorRef.current?.getInstance().getMarkdown();
    const success = await putBoard(
      Number(iboard),
      markdownContent as string,
      title,
      Number(importance),
      deletePicList,
      addNewPic
    );
    success ? navigate('/admin/home/notice') : null;
  };

  // 중요공지 드롭다운
  const statusList = [
    { id: '0', title: '일반공지' },
    { id: '1', title: '중요공지' },
  ];

  // JSX
  return (
    <>
      {loading ? (
        <NoticeWrap>
          <div className="notice-detail-wrap">
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
                    <div>
                      <div className="notice-viewer">
                        <Viewer initialValue={ctnt} />
                      </div>
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
                        hooks={{
                          addImageBlobHook: handleUploadImageNew,
                        }}
                        hideModeSwitch={true}
                        initialEditType="wysiwyg"
                      />
                    </div>
                  ))}
              </div>
            </div>
            {loading && (
              <div className="notice-pics">
                <div>
                  <div className="pics-title">이미지</div>
                  {/* {pisc?.length === 0 ? (
                    <div className="no-pics">이미지가 없습니다</div>
                  ) : ( */}
                  <div className="pics-list-prev">
                    <div>
                      {pisc?.map((item: any, idx: any) => {
                        return (
                          <div className="pics-item" key={idx}>
                            <button
                              id="delete-check"
                              className={delActivate ? 'pics-delete' : 'hide'}
                              onClick={() => handleDeletePics(item.ipic)}
                            >
                              X
                            </button>
                            <img src={`/imgs/boardPic/${iboard}/${item.pic}`} />
                          </div>
                        );
                      })}
                      {showNewPic.length !== 0 ? (
                        showNewPic?.map((item: any, idx: number) => {
                          return (
                            <div className="pics-item" key={idx}>
                              <button
                                id="delete-check"
                                className={delActivate ? 'pics-delete' : 'hide'}
                                onClick={() => handleDeleteImageNew(idx)}
                              >
                                X
                              </button>
                              <img src={item} alt={`미리보기 ${idx + 1}`} />
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </div>
            )}
          </div>
          {adminMode ? (
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
                    onClick={() => {
                      setEdit(false);
                      setDelActivate(false);
                    }}
                  />
                </>
              )}
            </Wbtns>
          ) : (
            <Wbtns>
              <CommonButton value="뒤로가기" btnType="page" onClick={() => navigate(-1)} />
            </Wbtns>
          )}
        </NoticeWrap>
      ) : (
        <NoticeLoading>
          <FadeLoader color="#47b5ff" height={15} margin={5} radius={6} width={4} />
        </NoticeLoading>
      )}

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
