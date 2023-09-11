import styled from '@emotion/styled';

const DashboardLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: grid;
  grid-template: auto auto / 1fr 1fr;
  gap: 20px;
`;

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px 1px;
  padding: 15px 0;
  > div.title {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    font-weight: bold;
    padding: 0 15px;
    > button {
      cursor: pointer;
      border: none;
      height: 100%;
      padding: 0 10px;
      border-radius: 3px;
      background: #c0c3c6;
      color: white;
    }
  }
  &.chart {
    grid-column: span 2;
    > div {
      padding: 0 15px;
      height: 300px !important;
      &.title {
        height: auto !important;
      }
    }
  }
  &.timetable {
    grid-row: span 2;
  }
`;

const DashboardTimetable = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  flex-direction: column;
  > div.timetable-header {
    display: grid;
    height: 50px;
    grid-template-columns: 120px repeat(5, auto);
    border-top: 2px solid var(--table-outline-color);
    border-bottom: 2px solid var(--table-outline-color);
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--main-bg-color);
      border-right: 1px solid var(--table-border-color);
      font-size: 16px;
      font-weight: bold;
      &:first-of-type {
        border-right: 2px solid var(--table-outline-color);
      }
      &:last-of-type {
        border-right: none;
      }
    }
  }
  > div.timetable-content {
    display: flex;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid var(--table-outline-color);
    > div.timetable-time {
      display: grid;
      width: 120px;
      font-size: 16px;
      grid-template-rows: repeat(9, auto);
      border-right: 2px solid var(--table-outline-color);
      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        border-bottom: 1px solid var(--table-border-color);
        &:last-of-type {
          border-bottom: none;
        }
        > span:last-of-type {
          font-size: 14px;
        }
      }
    }
    > div.timetable-lectures {
      display: grid;
      width: calc(100% - 120px);
      grid-template: repeat(9, auto) / repeat(5, auto);
      position: relative;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid var(--table-border-color);
        border-bottom: 1px solid var(--table-border-color);
        width: 100%;
        height: 100%;
        &:nth-of-type(5n) {
          border-right: none;
        }
        &:nth-of-type(n + 41) {
          border-bottom: none;
        }
      }
      > div.timetable-loading {
        position: absolute;
        border: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--main-border-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        > span {
          font-size: 16px;
        }
      }
    }
    > div.timetable-error {
      width: calc(100% - 120px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      > svg {
        font-size: 60px;
        color: red;
        padding-bottom: 20px;
      }
    }
  }
`;

export { DashboardLayout, DashboardContent, DashboardTimetable };