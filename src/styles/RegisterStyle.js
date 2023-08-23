import styled from '@emotion/styled';

const ProfessorRegisterModal = styled.div`
  display: flex;
  width: 100%;
  line-height: normal !important;
  gap: 30px;
  padding: 0 30px;
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
  > div.register-form {
    width: 100%;
  }
`;

export { ProfessorRegisterModal };
