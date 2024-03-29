import React, { useEffect, useState } from 'react';
import {
  UserLayout,
  ImageUpload,
  FormTable,
  Row,
  ButtonContainer,
  Button,
  TopLayout,
  NoticeContainer,
  MiddleLayout,
} from '../../styles/UserStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { checkValidDate, checkValidPhone } from '../../modules/regex';
import api from '../../apis/api';
import mainSlice from '../../slices/mainSlice';
import { RootState } from '../../store';
import { ObjectType } from '../../types/components';

const CreateUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [major, setMajor] = useState<string | number | null>('');
  const [gender, setGender] = useState<string | number | null>('');
  const [birth, setBirth] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const { allMajorList } = useSelector((state: RootState) => state.major);
  const { state }: { state: string } = useLocation();
  const dispatch = useDispatch();

  const main = mainSlice.actions;

  useEffect(() => {
    if (!state) {
      alert('잘못된 접근입니다.');
      navigate(-1);
    }

    const role: ObjectType = {
      professor: '교수',
      students: '학생',
    };

    dispatch(main.setTitle(<span>{role[state]} 계정 생성</span>));
  }, []);

  const handleCreate = async () => {
    if (!(name && major && gender && birth && phone)) {
      alert('입력되지 않은 정보가 있습니다.');
      return;
    }

    if (!checkValidDate(birth)) {
      alert('올바르지 않은 날짜입니다.');
      return;
    }

    if (!checkValidPhone(phone)) {
      alert('올바르지 않은 전화번호입니다.');
      return;
    }

    const payload = {
      imajor: major,
      nm: name,
      gender,
      birthdate: birth,
      phone,
    };

    try {
      await api.post(`/api/admin/${state}`, [payload]);
      navigate(-1);
    } catch {
      alert('오류가 발생하였습니다.');
      return;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z\s]/g, ''));
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirth(
      value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
        .replace(/(-{1,2})$/g, '')
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(
      value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(-{1,2})$/g, '')
    );
  };

  return (
    <UserLayout>
      <TopLayout>
        <NoticeContainer>
          <span>* 본인만 이미지 등록 및 수정이 가능합니다.</span>
          <span>* 본인 확인이 불가능한 이미지는 사용이 불가능합니다.</span>
        </NoticeContainer>
        <ButtonContainer>
          <Button onClick={handleCreate}>생성</Button>
          <Button negative onClick={() => navigate(-1)}>
            취소
          </Button>
        </ButtonContainer>
      </TopLayout>
      <MiddleLayout>
        <ImageUpload />
      </MiddleLayout>
      <FormTable>
        <Row col={2}>
          <div>이름</div>
          <div>
            <Input
              type="text"
              isForm={true}
              placeholder="이름을 입력하세요."
              reset={setName}
              value={name}
              setValue={handleNameChange}
            />
          </div>
          <div>성별</div>
          <div>
            <Dropdown
              isForm={true}
              placeholder="성별을 선택하세요."
              data={[
                { id: 'M', title: '남' },
                { id: 'F', title: '여' },
              ]}
              propertyName={{ key: 'id', value: 'title' }}
              value={gender}
              setValue={setGender}
              reset
              search
            />
          </div>
        </Row>
        <Row col={2}>
          <div>생년월일</div>
          <div>
            <Input
              type="text"
              isForm={true}
              reset={setBirth}
              maxLength={10}
              placeholder="YYYY-MM-DD"
              value={birth}
              setValue={handleBirthChange}
            />
          </div>
          <div>전공</div>
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
            />
          </div>
        </Row>
        <Row col={2}>
          <div>휴대전화</div>
          <div>
            <Input
              type="text"
              isForm={true}
              reset={setPhone}
              maxLength={13}
              placeholder="010-0000-0000"
              value={phone}
              setValue={handlePhoneChange}
            />
          </div>
          <div>E-mail</div>
          <div>
            <Input type="text" isForm={true} disabled={true} placeholder="(본인이 입력)" />
          </div>
        </Row>
        <Row>
          <div>주소</div>
          <div>
            <Input type="text" isForm={true} disabled={true} placeholder="(본인이 입력)" />
          </div>
        </Row>
      </FormTable>
    </UserLayout>
  );
};

export default CreateUser;
