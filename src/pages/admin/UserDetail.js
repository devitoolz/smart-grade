import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonContainer,
  UserLayout,
  FormTable,
  NoticeContainer,
  Row,
  TopLayout,
  MiddleLayout,
  LectureTableLayout,
  ProfileImage,
} from '../../styles/UserStyle';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice from '../../slices/mainSlice';
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faCircleExclamation,
  faPencil,
  faTriangleExclamation,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { PulseLoader } from 'react-spinners';

const UserDetail = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);
  const [lectureList, setLectureList] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);

  const { allMajorList } = useSelector(state => state.major);
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const main = mainSlice.actions;

  const pathSegments = pathname.split('/').filter(Boolean);
  const role = pathSegments[2];

  const roleKor = {
    professor: '교수',
    students: '학생',
  };

  const getUserDetail = async () => {
    try {
      const { data } = await api.get(`/api/admin/${role}/${id}`);
      console.log(data);
      setUserDetail(data.profile);
      setLectureList(data.lectureList);
      setName(data.profile.name);
      setMajor(data.profile.imajor);
      data.profile.pic
        ? setImg(
            `/imgs/${role}/${
              data.profile[
                (role === 'professor' && 'iprofessor') || (role === 'students' && 'istudent')
              ]
            }/${data.profile.pic}`
          )
        : null;

      const title = (
        <>
          <span className="breadcrumb" onClick={() => navigate(`/admin/user/${role}`)}>
            {roleKor[role]} 계정 관리
          </span>
          <FontAwesomeIcon icon={faChevronRight} />
          <span>
            {data.profile.name} {roleKor[role]} 정보
          </span>
        </>
      );

      dispatch(main.setTitle(title));
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleEdit = async () => {
    // TODO: API 만들어지면 정보 수정 put method 추가
    setUserDetail({ ...userDetail, name, major });
    setDisabled(true);
  };

  const handleRemove = async () => {
    try {
      alert(
        `${userDetail?.name} ${roleKor[role]}${
          (role === 'professor' && '가 퇴직') || (role === 'students' && '이 퇴학')
        } 처리되었습니다.`
      );
      navigate(`/admin/user/${role}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setName(userDetail?.name);
    setMajor(userDetail?.imajor);
    setDisabled(true);
  };

  const handleNameChange = e => {
    const value = e.target.value;
    setName(value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, ''));
  };

  return (
    <UserLayout>
      <TopLayout>
        <NoticeContainer></NoticeContainer>
        <ButtonContainer>
          <Button onClick={disabled ? () => setDisabled(false) : handleEdit}>
            {disabled ? '수정' : '저장'}
          </Button>
          <Button negative onClick={disabled ? handleRemove : handleCancel}>
            {disabled ? '삭제' : '취소'}
          </Button>
        </ButtonContainer>
      </TopLayout>
      <MiddleLayout>
        <ProfileImage>
          {img ? <img src={img} alt="프로필 이미지" /> : <FontAwesomeIcon icon={faUser} />}
        </ProfileImage>
        <LectureTableLayout>
          <div className="lecture-table-header">
            <div>강의명</div>
            <div>강의 기간</div>
            <div>강의 시간</div>
          </div>
          <div className="lecture-table-body">
            {lectureList ? (
              <>
                {lectureList.map((item, index) => (
                  <div key={index} className="lecture-table-content">
                    <div>{item.lectureName}</div>
                    <div>{`${item.lectureStrDate} ~ ${item.lectureEndDate}`}</div>
                    <div>{`${item.lectureStrTime} ~ ${item.lectureEndTime}`}</div>
                  </div>
                ))}
                {lectureList.length === 0 && (
                  <div className="lecture-table-no-content">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <span>
                      {(role === 'students' && '수강 중인 ') ||
                        (role === 'professor' && '강의 중인 ')}
                      강의가 없습니다.
                    </span>
                  </div>
                )}
                {lectureList.length <= 7 &&
                  Array(7 - (lectureList?.length ?? 0))
                    .fill()
                    .map((_, index) => (
                      <div key={index} className="lecture-table-content">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ))}
              </>
            ) : (
              <>
                {Array(7)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="lecture-table-content">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ))}
                <div className="lecture-table-no-content">
                  {error ? (
                    <>
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                      <span>데이터를 불러올 수 없습니다.</span>
                    </>
                  ) : (
                    <>
                      <PulseLoader color="#47b5ff" margin={6} size={12} speedMultiplier={0.7} />
                      <span>로딩 중...</span>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </LectureTableLayout>
      </MiddleLayout>
      <NoticeContainer right>
        <span>* 이름과 전공은 임의로 수정이 불가능합니다.</span>
      </NoticeContainer>
      <FormTable>
        <Row col={2}>
          <div>
            {!disabled && <FontAwesomeIcon icon={faPencil} />}
            이름
          </div>
          <div>
            <Input
              type="text"
              isForm={true}
              placeholder="이름을 입력하세요."
              reset={setName}
              value={name || ''}
              setValue={handleNameChange}
              disabled={disabled}
            />
          </div>
          <div>성별</div>
          <div>{(userDetail?.gender === 'M' && '남') || (userDetail?.gender === 'F' && '여')}</div>
        </Row>
        <Row col={2}>
          <div>생년월일</div>
          <div>{userDetail?.birthdate}</div>
          <div>
            {!disabled ? <FontAwesomeIcon icon={faPencil} /> : null}
            전공
          </div>
          <div>
            <Dropdown
              isForm={true}
              placeholder="전공을 선택하세요."
              data={allMajorList}
              propertyName={{ key: 'imajor', value: 'majorName' }}
              value={major}
              setValue={setMajor}
              reset
              search
              disabled={disabled}
            />
          </div>
        </Row>
        <Row col={2}>
          <div>{(role === 'students' && '학번') || (role === 'professor' && '등록일')}</div>
          <div>
            {(role === 'students' && userDetail?.studentNum) ||
              (role === 'professor' && userDetail?.createdAt?.split('T')[0])}
          </div>
          <div>{(role === 'students' && '졸업 여부') || (role === 'professor' && '퇴직 여부')}</div>
          <div>
            {role === 'students' &&
              ((userDetail?.finishedYn === 1 && '재학 중') ||
                (userDetail?.finishedYn === 2 && '졸업'))}
            {role === 'professor' &&
              ((userDetail?.delYn === 0 && '재직 중') || (userDetail?.delYn === 1 && '퇴직'))}
          </div>
        </Row>
        {role === 'students' && (
          <Row col={2}>
            <div>학년</div>
            <div>{userDetail?.grade}</div>
            <div>이수학점</div>
            <div>{userDetail?.score}</div>
          </Row>
        )}
        <Row col={2}>
          <div>휴대전화</div>
          <div>{userDetail?.phone}</div>
          <div>E-mail</div>
          <div>{userDetail?.email || <span>(정보 수정 필요)</span>}</div>
        </Row>
        <Row>
          <div>주소</div>
          <div>{userDetail?.address || <span>(정보 수정 필요)</span>}</div>
        </Row>
      </FormTable>
    </UserLayout>
  );
};

export default UserDetail;
