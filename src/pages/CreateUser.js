import React from 'react';
import {
  CreateUserLayout,
  ImageUpload,
  FormTable,
  NoticeSpan,
  TwoColumns,
  ButtonContainer,
  Button,
} from '../styles/CreateUserStyle';

const CreateUser = () => {
  return (
    <CreateUserLayout>
      <NoticeSpan>* 최대 5MB의 이미지 확장자 파일(.jpeg, .png)만 업로드 가능합니다.</NoticeSpan>
      <NoticeSpan>* 본인 확인이 불가능한 이미지는 사용이 불가능 합니다.</NoticeSpan>
      <ImageUpload />
      <FormTable>
        <TwoColumns>
          <div>이름</div>
          <div>
            <input type="text" />
          </div>
          <div>성별</div>
          <div>
            <input type="text" />
          </div>
        </TwoColumns>
        <TwoColumns>
          <div>생년월일</div>
          <div>
            <input type="text" />
          </div>
          <div>전공</div>
          <div>
            <input type="text" />
          </div>
        </TwoColumns>
        <TwoColumns>
          <div>전화번호</div>
          <div>
            <input type="text" />
          </div>
          <div>임시 비밀번호</div>
          <div>
            <input type="text" />
          </div>
        </TwoColumns>
      </FormTable>
      <ButtonContainer>
        <Button>생성</Button>
      </ButtonContainer>
    </CreateUserLayout>
  );
};

export default CreateUser;
