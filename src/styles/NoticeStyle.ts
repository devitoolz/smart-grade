import styled from '@emotion/styled';

export const NoticeWrap = styled.div`
  padding: 0 50px;

  /* NoticeDetail */
  .notice-box {
    padding: 6px 12px 12px;
    border: 1px solid var(--primary-border-color);
    border-radius: 6px;
  }

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

    .status {
      width: 70px;
      height: 35px;
      border: 1px solid var(--primary-border-color);
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.important {
        border: 1px solid #ffc6c9;
        background-color: #ffe3e4;
        color: #ff4e59;
      }
    }
    h2 {
      line-height: 35px;
    }
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
    border: 1px solid transparent;
  }

  .notice-view-area {
    margin-top: 10px;
    border-top: 1px solid transparent;
    .notice-viewer {
      margin-bottom: 12px;
      padding: 10px 25px;
      height: 650px;
      border: 1px solid var(--primary-border-color);
      overflow-y: scroll;
    }
  }
`;
