import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Ltable, Wbtns } from '../../styles/LectureRoomCss';
import { TextArea } from '../../styles/MyStyleCSS';
import CommonButton from '../../components/CommonButton';
import useQuerySearch from '../../hooks/useSearchFetch';
import Input from '../../components/Input';
import CommonModal from '../../components/CommonModal';
import { putBoard } from '../../apis/fetch';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import Dropdown from '../../components/Dropdown';

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const boardnum = pathname.split('/');
  const iboard = boardnum[boardnum.length - 1];
  const [click] = useState(false);
  const url = `/api/board/${iboard}`;
  const { data } = useQuerySearch(url, click);

  // 게시글 수정
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(data?.title);
  const [ctnt, setCtnt] = useState(data?.ctnt);
  const handleChangeTitle = e => setTitle(e.target.value);
  const handleChangeCtnt = e => setCtnt(e.target.value);
  const handleEditBoard = () => {
    setEdit(true);
    setTitle(data.title);
    setCtnt(data.ctnt);
  };
  // 툴바 커스텀
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['table', 'image', 'link'],
  ];
  const editorRef = useRef(null);
  // 모달창 오픈
  const [display, setDisplay] = useState(false);
  const putBoardWait = async () => {
    setDisplay(false);
    const importance = document.getElementById('check').checked ? 1 : 0;
    await putBoard(iboard, ctnt, title, importance);
    alert('처리되었습니다');
    navigate('/admin/home/notice');
  };

  // 게시글 확인-toast ui test
  const test = `# markdown
  ~~***test***~~
  ing
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloremque eligendi quibusdam maiores quidem officia, aliquam eveniet fugit necessitatibus voluptate cumque cupiditate magni dolorum pariatur dolorem laboriosam distinctio. Illum, atque.
  `;
  // 중요공지 체크
  const statusList = [
    { id: '0', title: '일반공지' },
    { id: '1', title: '중요공지' },
  ];
  const [importance, setImportance] = useState('');

  // JSX
  return (
    <>
      <div style={{ padding: '10px 50px 0' }}>
        <div style={{ border: '1px solid gray', padding: '2px 10px' }}>
          {/* 제목 */}
          {!edit ? (
            <h2 style={{ lineHeight: '35px' }}>제목이 들어가는 영역</h2>
          ) : (
            <Input
              type="text"
              length="full"
              placeholder="제목 (최대 50자)"
              maxLength={50}
              value={title}
              setValue={e => setTitle(e.target.value)}
            />
          )}
          <div>
            {edit && (
              <>
                <input type="checkbox" id="check" defaultChecked={data?.importance} />
                <label htmlFor="check">중요공지사항</label>
              </>
            )}
            {edit ||
              (data?.importance ? (
                <label htmlFor="check" style={{ color: 'red', fontWeight: 700 }}>
                  중요공지
                </label>
              ) : (
                <label htmlFor="check">일반 게시글</label>
              ))}
          </div>
          {/* <Dropdown
            length="short"
            placeholder="일반공지"
            data={statusList}
            value={importance}
            setValue={setImportance}
            reset={false}
          /> */}
          <span>작성일 | 2023-00-00</span>
          <hr />
          <div style={{ width: 100, height: 10 }}></div>
          {/* 내용 */}
          <div style={{ height: 650, border: '1px solid red', overflowY: 'scroll' }}>
            {!edit ? (
              <Viewer initialValue={test} />
            ) : (
              <Editor
                ref={editorRef}
                placeholder="내용을 입력하세요"
                initialValue={test}
                previewStyle="vertical"
                height="600px"
                useCommandShortcut={false}
                language="ko-KR"
                toolbarItems={toolbarItems}
                // hooks={{
                //   addImageBlobHook: handleUploadImage,
                // }}
                hideModeSwitch={true}
                initialEditType="wysiwyg"
                // viewer={true} // 나중에 다시 살펴보기
              />
            )}
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
      </div>
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
