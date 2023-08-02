import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import { Ltable, Lwrap, Pagenation, PlusModal } from '../styles/LectureRoomCss';
import Input from '../components/Input';
import CommonButton from '../components/CommonButton';
import { useNavigate } from 'react-router-dom';
const Major = () => {
  //modalTitle state
  const [modalTitle, setmodalTitle] = useState('강의실추가', '전공추가');
  //전공명 state
  const [majorName, setMajorName] = useState('');
  //전공학점 state
  const [majorScore, setMajorScore] = useState(null);
  //모달창 활성화
  const [showModal, setshowModal] = useState(false);

  const navigate = useNavigate();

  //버튼 onClick시 모달창 열기
  const modalOpen = () => {
    setshowModal(true);
  };

  //취소, x 누를시 모달창 닫기
  const modalClose = () => {
    setshowModal(false);
  };

  const gogo = () => {
    alert('dkdk');
  };

  const hi = () => {
    alert('수정하시겠습니까?');
  };
  const bye = () => {
    alert('삭제하시겠습니까?');
  };
  const navigate = useNavigate();
  return (
    <Lwrap>
      <SearchBar>
        <Dropdown placeholder="" />
        <Dropdown length="long" placeholder="전공명" />
      </SearchBar>
      <CommonButton btnType="page" value="전공추가" onClick={modalOpen} />
      {showModal === true ? (
        <PlusModal>
          <div className="majorTitle">
            <p>
              <strong> 전공추가 </strong>
            </p>
            <p onClick={modalClose}>
              <FontAwesomeIcon icon={faX} />
            </p>
          </div>
          <div className="majorName">
            <p>전공명</p>
            <div>
              <Input type="text" length="short" value={majorName} setValue={setMajorName}></Input>
            </div>
          </div>
          <div className="btns"></div>
        </PlusModal>
      ) : null}

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
                <CommonButton color="red" btnType="table" value="삭제" onClick={bye} />
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
        <p onClick={() => navigate('/home/notice/write')}>1</p>
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
