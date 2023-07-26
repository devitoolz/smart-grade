import React from 'react';

import { Lwrap, Title, QuestionWindow, Ltable, Bname, Pagenation } from '../styles/LectureRoomCss';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
const LectureRoom = () => {
  return (
    <Lwrap>
      <SearchBar>
        <Dropdown />
      </SearchBar>

      <Ltable>
        <colgroup>
          <col className="number" width={'7%'} />
          <col className="place" width={'35%'} />
          <col className="capacity" width={'15%'} />
          <col className="management" width={'20%'} />
        </colgroup>
        <th>번호</th>
        <th>장소</th>
        <th>최대 수용인원</th>
        <th>관리</th>

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
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
        </tr>
      </Ltable>
      <Pagenation>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
      </Pagenation>
    </Lwrap>
  );
};

export default LectureRoom;
