import styled from '@emotion/styled';

export const NoticeWrap = styled.div`
  padding: 0 50px;

  .notice-header {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--black);
    height: 50px;
    h3 {
      font-size: 22px;
    }
    .notice-btn {
      display: flex;
      button {
        padding: 6px 12px;
      }
    }
  }

  .notice-title {
    margin-bottom: 12px;
    display: flex;
    gap: 12px;
  }

  .notice-file {
    margin-bottom: 12px;
    border-top: 1px solid var(--main-border-color);
    border-bottom: 1px solid var(--main-border-color);
    font-size: 14px;
    position: relative;
    display: flex;

    & > span {
      line-height: 36px;
    }
    & > span::after {
      content: '|';
      margin: 0 10px;
    }

    .file-list {
      display: flex;
      padding: 8px 0;
      .file-item {
        margin-right: 10px;
        border: 1px solid var(--main-border-color);
        border-radius: 20px;
        padding: 0 10px;
        &:last-of-type {
          margin-right: 0;
        }
        button {
          font-size: 8px;
          margin-left: 3px;
          cursor: pointer;
        }
      }
    }
  }

  .notice-content {
    margin-bottom: 12px;
  }
`;
