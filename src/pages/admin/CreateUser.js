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
  OneColumn,
} from '../../styles/CreateUserStyle';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';

const CreateUser = () => {
  const navigate = useNavigate();

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
          <Button>생성</Button>
          <Button onClick={() => navigate(-1)}>취소</Button>
        </ButtonContainer>
      </TopLayout>
      <FormTable>
        <Row col={2}>
          <div>이름</div>
          <div>
            <Input type="text" isForm={true} value />
          </div>
          <div>전공</div>
          <div></div>
        </Row>
        <Row col={2}>
          <div>성별</div>
          <div></div>
          <div>E-mail</div>
          <div></div>
        </Row>
        <Row col={2}>
          <div>생년월일</div>
          <div></div>
          <div>휴대전화</div>
          <div></div>
        </Row>
        <Row>
          <div>주소</div>
          <div></div>
        </Row>
        <Row>
          <div>상세주소</div>
          <div></div>
        </Row>
      </FormTable>
    </CreateUserLayout>
  );
};

export default CreateUser;
