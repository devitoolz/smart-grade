import styled from '@emotion/styled';

const UserLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
`;

const TopLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MiddleLayout = styled.div`
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 40px;
`;

const NoticeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  ${({ right }) => right && 'align-items: flex-end; padding-top: 10px;'};
  > span {
    color: var(--negative-color);
    &:last-of-type {
      padding-top: 5px;
    }
  }
`;

const ImageUpload = styled.div`
  width: 250px;
  min-width: 250px;
  height: 339px;
  border: 1px dashed var(--black);
  border-radius: 15px;
  > img {
    width: 100%;
    height: 100%;
    background: var(--white);
  }
`;

const ProfileImage = styled.div`
  border: 1px solid var(--table-border-color);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  min-width: 250px;
  height: 339px;
  border-radius: 15px;
  background: var(--search-bg-color);
  overflow: hidden;
  > svg {
    align-self: flex-end;
    font-size: 300px;
    color: var(--search-ph-color);
  }
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModifyImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  input {
    position: absolute;
    width: 100%;
    visibility: hidden;
  }
  > label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    padding: 0 10px;
    height: 35px;
    background: var(--primary-color);
    color: var(--white);
    > svg {
      width: 20px;
      padding-right: 10px;
    }
  }
`;

const CancelModifyButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  padding: 0 10px;
  height: 35px;
  background: var(--negative-color);
  color: var(--white);
  > svg {
    width: 20px;
    padding-right: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const Button = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  padding: 0 25px;
  height: 35px;
  background: ${({ negative }) => (negative ? 'var(--negative-color)' : 'var(--primary-color)')};
  color: var(--white);
`;

const LectureTableLayout = styled.div`
  width: 100%;
  height: 339px;
  overflow: hidden;
  border: 1px solid var(--table-border-color);
  display: flex;
  flex-direction: column;
  div.lecture-table-header {
    border-bottom: 1px solid var(--table-border-color);
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    background: var(--main-bg-color);
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      font-size: 16px;
      font-weight: bold;
      border-right: 1px solid var(--table-border-color);
      &:last-of-type {
        border-right: none;
      }
    }
  }
  div.lecture-table-body {
    position: relative;
    height: 100%;
    font-size: 16px;
    overflow: auto;
    > div.lecture-table-no-content {
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: var(--main-border-color);
      gap: 20px;
      > svg {
        font-size: 30px;
      }
    }
    > div.lecture-table-content {
      display: grid;
      grid-template-columns: 2fr 2fr 1fr;
      border-bottom: 1px solid var(--table-border-color);
      &:last-of-type {
        border-bottom: none;
      }
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-right: 1px solid var(--table-border-color);
        &:last-of-type {
          border-right: none;
        }
      }
    }
  }
`;

const FormTable = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: ${({ col }) => (col === 2 ? '1fr 2fr 1fr 2fr' : '1fr 5fr')};
  &:first-of-type {
    > div {
      &:nth-of-type(odd) {
        border-top: 2px solid var(--form-table-odd-border-color);
      }
      &:nth-of-type(even) {
        border-top: 2px solid var(--form-table-even-border-color);
      }
    }
  }
  &:last-of-type {
    > div {
      &:nth-of-type(odd) {
        background: var(--primary-color);
      }
      &:nth-of-type(even) {
        background: var(--form-table-bg-color);
      }
    }
  }
  > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    text-align: center;
    height: 46px;
    box-sizing: content-box;
    &:nth-of-type(odd) {
      font-weight: bold;
      color: var(--white);
      background: var(--primary-color);
      border-bottom: 2px solid var(--form-table-odd-border-color);
    }
    &:nth-of-type(even) {
      background: var(--form-table-bg-color);
      border-bottom: 2px solid var(--form-table-even-border-color);
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
    > svg {
      position: absolute;
      left: 15px;
    }
    > span {
      color: var(--search-ph-color);
    }
  }
`;

const PasswordForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: ${({ find }) => (find ? '1fr 1fr' : '1fr 1fr 1fr')};
  font-size: 16px;
  gap: 15px;
  row-gap: ${({ find }) => (find ? '30px' : null)};
  > label {
    display: flex;
    align-items: center;
  }
`;

export {
  UserLayout,
  TopLayout,
  MiddleLayout,
  NoticeContainer,
  ImageUpload,
  ProfileImage,
  ModifyImage,
  CancelModifyButton,
  ButtonContainer,
  Button,
  LectureTableLayout,
  FormTable,
  Row,
  PasswordForm,
};
