import React from 'react';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import { Ltable, Lwrap, Pagenation } from '../styles/LectureRoomCss';
import CommonButton from '../components/CommonButton';
const Major = () => {
  const gogo = () => {
    console.log('gogo');
  };

  const hi = () => {
    alert('수정하시겠습니까?');
  };
  const bye = () => {
    alert('삭제하시겠습니까?');
  };
  return (
    <Lwrap>
      <SearchBar>
        <Dropdown placeholder="" />
        <Dropdown length="long" placeholder="전공명" />
      </SearchBar>
      <CommonButton btnType="page" value="전공추가" onClick={gogo} />

      <Ltable>
        <colgroup>
          <col className="number" width={'7%'} />
          <col className="major" width={'35%'} />
          <col className="clost" width={'15%'} />
          <col className="management" width={'20%'} />
          <col className="note" width={'20%'} />
        </colgroup>

        <th>번호</th>
        <th>전공 명</th>
        <th>폐지여부</th>
        <th>관리</th>
        <th>비고</th>

        {Array(10)
          .fill()
          .map((item, idx) => (
            <tr key={idx}>
              <td>1</td>
              <td>2</td>
              <td>O</td>
              <td>
                <CommonButton color="blue" btnType="table" value="수정" onClick={hi} />
                <CommonButton color="blue" btnType="table" value="삭제" onClick={bye} />
              </td>
              <td>4</td>
            </tr>
          ))}
        {/* <tr>
          <td>5</td>
          <td>6</td>
          <td></td>
          <td>8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>9</td>
          <td>10</td>
          <td></td>
          <td>12</td>
          <td>12</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td></td>
          <td>16</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td></td>
          <td>16</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td></td>
          <td>16</td>
          <td>변경(구 목탁 디자인과)</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td></td>
          <td>16</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td></td>
          <td>15</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td>O</td>
          <td>16</td>
          <td>16</td>
        </tr>
        <tr>
          <td>13</td>
          <td>14</td>
          <td></td>
          <td>15</td>
          <td>16</td>
        </tr> */}
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
export default Major;
