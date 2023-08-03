import React, { useState } from 'react';
import {
  CreateUserLayout,
  ImageUpload,
  FormTable,
  Row,
  ButtonContainer,
  Button,
  TopLayout,
  NoticeContainer,
} from '../../styles/CreateUserStyle';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import { useSelector } from 'react-redux';

const CreateUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [imajor, setImajor] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  const { majorList } = useSelector(state => state.major);

  const checkValidDate = value => {
    const dateRegex =
      /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    const date = value.split('-');
    const year = parseInt(date[0]);
    const month = parseInt(date[1]);
    const day = parseInt(date[2]);
    const result = dateRegex.test(`${day}-${month}-${year}`);
    return result;
  };

  const handleCreate = () => {
    console.log(name, imajor, gender, birth, phone);
    if (!checkValidDate(birth)) {
      alert('존재하지 않는 날짜입니다.');
      return;
    }
  };

  const handleNameChange = e => {
    const value = e.target.value;
    setName(value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, ''));
  };

  const handleBirthChange = e => {
    const value = e.target.value;
    setBirth(
      value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
        .replace(/(-{1,2})$/g, '')
    );
  };

  const handlePhoneChange = e => {
    const value = e.target.value;
    setPhone(
      value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(-{1,2})$/g, '')
    );
  };

  return (
    <CreateUserLayout>
      <TopLayout>
        <div className="top-left">
          <ImageUpload />
          <NoticeContainer>
            <span>* 최대 5MB의 이미지 확장자 파일(.jpeg, .png)만 업로드 가능합니다.</span>
            <span>* 본인 확인이 불가능한 이미지는 사용이 불가능 합니다.</span>
          </NoticeContainer>
        </div>
        <ButtonContainer>
          <Button onClick={handleCreate}>생성</Button>
          <Button onClick={() => navigate(-1)}>취소</Button>
        </ButtonContainer>
      </TopLayout>
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
          <div>전공</div>
          <div>
            <Dropdown
              isForm={true}
              placeholder="전공을 선택하세요."
              data={majorList}
              propertyName={{ key: 'id', value: 'title' }}
              value={imajor}
              setValue={setImajor}
              reset
              search
            />
          </div>
        </Row>
        <Row col={2}>
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
        <Row>
          <div>상세주소</div>
          <div>
            <Input type="text" isForm={true} disabled={true} placeholder="(본인이 입력)" />
          </div>
        </Row>
      </FormTable>
    </CreateUserLayout>
  );
};

export default CreateUser;
