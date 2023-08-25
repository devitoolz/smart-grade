import styled from '@emotion/styled';

const RegisterLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const ProfessorRegisterModal = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  line-height: normal !important;
  font-size: 16px;
  border-bottom: 1px solid var(--table-border-color);
  > div.register-form {
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--table-border-color);
    > div {
      display: grid;
      padding: 15px;
      border-bottom: 1px solid var(--table-border-color);
      grid-template-columns: 100px 200px;
      align-items: center;
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
  > div.time-table {
    width: 100%;
    padding: 15px;
  }

  > div.book-img {
    border: 1px solid var(--table-border-color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    min-width: 250px;
    height: 320px;
    border-radius: 10px;
    background: var(--search-bg-color);
    overflow: hidden;
  }
`;

export { RegisterLayout, ButtonContainer, ProfessorRegisterModal };
