import styled from '@emotion/styled';

const flexCenter = `
  justify-content: center;
  align-items: center;
`;

const SearchBarLayout = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  ${flexCenter};
  background: var(--search-bg-color);
  gap: 15px;
`;

const SearchButton = styled.span`
  display: flex;
  ${flexCenter};
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: var(--white);
  border: 1px solid var(--primary-border-color);
`;

export { SearchBarLayout, SearchButton };
