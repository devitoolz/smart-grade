import styled from '@emotion/styled';

const CreateUserLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
`;

const NoticeSpan = styled.span`
  color: var(--negative-color);
  &:last-of-type {
    padding-top: 5px;
    padding-bottom: 20px;
  }
`;

const ImageUpload = styled.div`
  width: 250px;
  aspect-ratio: 3 / 4;
  border: 1px dashed var(--black);
  border-radius: 15px;
  margin-bottom: 40px;
`;

const FormTable = styled.div`
  width: 100%;
  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  /* border: 2px solid var(--title-txt-color); */
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 2fr;
  border-bottom: 1px solid var(--table-border-color);
  &:last-of-type {
    border-bottom: none;
  }
  > div {
    color: var(--white);
    font-weight: bold;
    font-size: 16px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    &:nth-of-type(odd) {
      background: var(--primary-color);
    }
    &:nth-of-type(even) {
      background: #f8f8f8;
    }
    > input {
      height: 100%;
      width: 100%;
      border: none;
      font-size: 16px;
      padding: 10px;
      text-align: center;
      background: transparent;
    }
  }
`;

const OneColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const Button = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  padding: 0 60px;
  height: 45px;
  background: var(--main-bg-color);
`;

export {
  CreateUserLayout,
  NoticeSpan,
  ImageUpload,
  FormTable,
  TwoColumns,
  OneColumn,
  ButtonContainer,
  Button,
};
