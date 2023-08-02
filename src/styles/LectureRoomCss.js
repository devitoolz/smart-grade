import styled from '@emotion/styled';


export const CommonButton = styled.div`
  margin: 35px 0;
`;

export const PlusModal = styled.div`
  position: fixed;
  left: 50%;
  top: 20%;
  width: 400px;
  height: 238px;
  background-color: greenyellow;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  .LectureLoomTitle {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dae8ff;

    p {
      padding: 15px 20px;
    }
  }
  .placeTitle {
    padding-left: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #dae8ff;
    .dropDownControl {
      z-index: 99;
    }
    .controls {
      display: flex;
      align-items: center;
    }

    .inputControl {
      display: flex;
      padding: 12px 20px;
      align-items: center;
      p {
        margin-left: 5px;
      }
    }
  }
  .capacityTitle {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #dae8ff;
    align-items: center;
    padding-left: 20px;
    .inputControl {
      display: flex;
      padding: 12px 20px;
      align-items: center;
      p {
        margin-left: 5px;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    margin-top: 18px;
  }
`;
