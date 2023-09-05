import styled from '@emotion/styled';

export const NoticeWrap = styled.div`
  padding: 0 50px;

  /* NoticeDetail */
  .notice-detail-wrap {
    display: flex;
    gap: 12px;
    border: 1px solid var(--primary-border-color);
    border-radius: 6px;
    .notice-box {
      width: 70%;
      padding: 6px 12px 12px;
      border: 1px solid transparent;
      border-radius: 6px;
    }
    .notice-pics {
      width: 30%;
      padding: 6px 12px 24px;

      & > div {
        display: flex;
        flex-direction: column;
        height: 100%;
        border: 1px solid var(--primary-border-color);
        border-radius: 6px;
        overflow-y: auto;

        .pics-title {
          font-size: 16px;
          padding: 6px 12px;
          border-bottom: 1px solid var(--primary-border-color);
        }
        .no-pics {
          width: 100%;
          height: 100%;
          background-color: var(--primary-border-color);
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pics-item {
          position: relative;
          padding: 6px 12px;
          .hide {
            display: none;
            visibility: hidden;
            opacity: 0;
          }
          .pics-delete {
            position: absolute;
            top: 6px;
            left: 12px;
          }
          img {
            width: 100%;
          }
        }
      }
    }
  }
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
  .notice-container-box {
    display: flex;
    gap: 10px;

    & > div:first-of-type {
      width: 70%;
    }
    .notice-image-area {
      width: 30%;
      height: 700px;
      padding: 10px;
      border: 1px solid var(--primary-border-color);
      border-radius: 6px;
      overflow-y: auto;
      & > div {
        overflow: hidden;
      }

      .notice-upload {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--primary-border-color);

        .file-item {
          display: inline-block;
          padding: 5px 10px;
          margin-top: 6px;
          margin-right: 4px;
          border: 1px solid var(--main-border-color);
          border-radius: 20px;
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

      .notice-prev-show {
        overflow: hidden;

        .file-prev-item {
          margin-bottom: 6px;
          padding: 0 2px;
          position: relative;

          img {
            max-width: 100%;
          }

          button {
            position: absolute;
            top: 4px;
            left: 6px;
            font-size: 12px;
            cursor: pointer;
          }
        }
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
    gap: 10px;
    margin-bottom: 12px;
    border: 1px solid transparent;
    position: relative;
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

export const NoticeLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
