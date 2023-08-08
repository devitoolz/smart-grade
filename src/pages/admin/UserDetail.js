import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonContainer,
  UserLayout,
  FormTable,
  ImageUpload,
  NoticeContainer,
  Row,
  TopLayout,
  MiddleLayout,
} from '../../styles/UserStyle';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice from '../../slices/mainSlice';
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const UserDetail = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');

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
      setUserDetail(data);
      setName(data.name);
      setMajor(data.imajor);

      dispatch(main.setTitle(`${data.name} ${roleKor[role]} 정보`));
    } catch (error) {
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
          <Button onClick={disabled ? () => navigate(-1) : handleCancel}>
            {disabled ? '닫기' : '취소'}
          </Button>
        </ButtonContainer>
      </TopLayout>
      <MiddleLayout>
        <ImageUpload />
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
              placeholder={!disabled ? '이름을 입력하세요.' : null}
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
              placeholder={!disabled && '전공을 선택하세요.'}
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
              (role === 'professor' && userDetail?.createdAt)}
          </div>
          <div>졸업여부</div>
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
            <div></div>
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
