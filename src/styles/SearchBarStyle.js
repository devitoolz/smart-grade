import styled from '@emotion/styled';

const flexCenter = `
  justify-content: center;
  align-items: center;
`;

const SearchLayout = styled.div`
  width: 100%;
  height: 80px;
  min-height: 80px;
  display: flex;
  ${flexCenter};
  background: var(--search-bg-color);
  margin-top: 70px;
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

export { SearchLayout, SearchButton };
