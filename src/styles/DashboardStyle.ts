import styled from '@emotion/styled';

const DashboardLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: grid;
  grid-template: auto auto / 1fr 1fr;
  gap: 20px;
  > div {
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
  }
`;

export { DashboardLayout };
