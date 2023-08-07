import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonContainer,
  CreateUserLayout,
  FormTable,
  ImageUpload,
  NoticeContainer,
  Row,
  TopLayout,
} from '../../styles/CreateUserStyle';
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

  const getUserDetail = async () => {
    try {
      const { data } = await api.get(`/api/admin/${role}/${id}`);
      console.log(data);
      setUserDetail(data);
      setName(data.name);
      setMajor(data.imajor);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const roleKor = {
      professor: '교수',
      students: '학생',
    };

    dispatch(main.setTitle(`${roleKor[role]} 정보`));
    getUserDetail();
  }, []);

  const handleNameChange = e => {
    const value = e.target.value;
    setName(value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, ''));
  };

  return (
    <CreateUserLayout>
      <TopLayout>
        <NoticeContainer>
          <span>* 최대 5MB의 이미지 확장자 파일(.jpeg, .png)만 업로드 가능합니다.</span>
          <span>* 본인 확인이 불가능한 이미지는 사용이 불가능 합니다.</span>
        </NoticeContainer>
        <ButtonContainer>
          <Button onClick={() => setDisabled(false)}>수정</Button>
          <Button onClick={() => navigate(-1)}>취소</Button>
        </ButtonContainer>
      </TopLayout>
      <ImageUpload />
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
              value={name || '-'}
              setValue={handleNameChange}
              disabled={disabled}
            />
          </div>
          <div>성별</div>
          <div>
            <span>
              {userDetail?.gender === 'M' ? '남' : userDetail?.gender === 'F' ? '여' : '-'}
            </span>
          </div>
        </Row>
        <Row col={2}>
          <div>생년월일</div>
          <div>{userDetail?.birthdate}</div>
          <div>
            {!disabled && <FontAwesomeIcon icon={faPencil} />}
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
          <div>휴대전화</div>
          <div>{userDetail?.phone}</div>
          <div>E-mail</div>
          <div>{userDetail?.email || '-'}</div>
        </Row>
        <Row>
          <div>주소</div>
          <div>
            <Input type="text" isForm={true} disabled={true} placeholder="(본인이 입력)" />
          </div>
        </Row>
      </FormTable>
    </CreateUserLayout>
  );
};

export default UserDetail;
