import styled from '@emotion/styled';

export const Lwrap = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  h2 {
    left: 450px;
    color: #1363df;
    font-weight: 300;
  }
  button {
    left: 1050px;
    background: #dff6ff;
    border: #dff6ff;
    border-radius: 5px;
    padding: 10px 20px;
    p {
      font-size: 15px;
    }
  }
`;

export const QuestionWindow = styled.div`
  width: 800px;
  height: 120px;
  display: flex;
  justify-content: space-around;
  background: #d9d9d9;
  padding-top: 32px;
  gap: 10px;
  .building {
    width: 250px;
    height: 50px;
    border: none;
    text-align: center;
  }
  .room {
    width: 150px;
    height: 50px;
    border: none;
    text-align: center;
  }
  select option[value=''] {
    display: none;
  }
  .protect {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
  }
`;
export const Ltable = styled.table`
  border: 10px;
  width: 800px;
  height: 300px;
  border-color: green;
  background: skyblue;
  text-align: center;
`;
