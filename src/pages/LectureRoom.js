import React from 'react';

import { Lwrap, Title, QuestionWindow, Ltable } from '../styles/LectureRoomCss';
const LectureRoom = () => {
  return (
    <Lwrap>
      <Title>
        <h2>통합 강의실관리</h2>
        <button>
          <p>강의실 추가</p>
        </button>
      </Title>

      <QuestionWindow>
        <label htmlFor="건물명">
          <select name="building" className="building" required>
            <option value="" disabled selected>
              건물명
            </option>
            <option value="a관">a관</option>
            <option value="b관">b관</option>
            <option value="c관">c관</option>
          </select>
        </label>
        <label htmlFor="호실">
          <select name="room" className="room" required>
            <option value="" disabled selected>
              호실
            </option>
            <option value="301호">301호</option>
            <option value="302호">302호</option>
            <option value="303호">303호</option>
          </select>
        </label>
        <div className="protect"></div>
      </QuestionWindow>

      <table border={1} width={570} height={650}>
        <th>번호</th>
        <th>장소</th>
        <th>최대 수용인원</th>
        <th>관리</th>
        <th>비고</th>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
        <tr>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
        </tr>
        <tr>
          <td>9</td>
          <td>10</td>
          <td>11</td>
          <td>12</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr>
      </table>
    </Lwrap>
  );
};

export default LectureRoom;
