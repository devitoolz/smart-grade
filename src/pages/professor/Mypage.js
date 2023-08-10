import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonContainer,
  UserLayout,
  FormTable,
  NoticeContainer,
  Row,
  TopLayout,
  MiddleLayout,
  LectureTableLayout,
  ProfileImage,
} from '../../styles/UserStyle';
import Input from '../../components/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice from '../../slices/mainSlice';
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faCircleExclamation,
  faPencil,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Mypage = () => {
  const [lectureList, setLectureList] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [img, setImg] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const { user } = useSelector(state => state.main);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const main = mainSlice.actions;

  const pathSegments = pathname.split('/').filter(Boolean);
  const role = pathSegments[2];

  useEffect(() => {
    setImg(`http://192.168.0.144:5002/imgs/professor/${user?.iprofessor}/${user?.pic}`);
  }, [user]);

  const handleEdit = async () => {
    // TODO: API 만들어지면 정보 수정 put method 추가
    // setuser({ ...user, name, major });
    setDisabled(true);
  };

  const handleCancel = () => {
    // setName(user?.name);
    // setMajor(user?.imajor);
    setDisabled(true);
  };

  const handlePhoneChange = e => {
    const value = e.target.value;
    setPhone(
      value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(-{1,2})$/g, '')
    );
  };

  const handleEmailChange = e => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleAddressChange = e => {
    const value = e.target.value;
    setAddress(value);
  };

  return (
    <UserLayout>
      <TopLayout>
        <NoticeContainer>
          <span>* 최대 5MB의 이미지 확장자 파일(.jpeg, .png)만 업로드 가능합니다.</span>
          <span>* 본인 확인이 불가능한 이미지는 사용이 불가능합니다.</span>
        </NoticeContainer>
        <ButtonContainer>
          <Button onClick={disabled ? () => setDisabled(false) : handleEdit}>
            {disabled ? '수정' : '저장'}
          </Button>
          {!disabled && (
            <Button negative onClick={handleCancel}>
              취소
            </Button>
          )}
        </ButtonContainer>
      </TopLayout>
      <MiddleLayout>
        <ProfileImage>
          {user?.pic ? <img src={img} alt="프로필 이미지" /> : <FontAwesomeIcon icon={faUser} />}
        </ProfileImage>
        <LectureTableLayout>
          <div className="lecture-table-header">
            <div>강의명</div>
            <div>강의 기간</div>
            <div>강의 시간</div>
          </div>
          <div className="lecture-table-body">
            {lectureList?.length === 0 && (
              <div className="lecture-table-no-content">
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span>강의 중인 강의가 없습니다.</span>
              </div>
            )}
            {lectureList?.map((item, index) => (
              <div key={index} className="lecture-table-content">
                <div>{item.lectureName}</div>
                <div>{`${item.lectureStrDate} ~ ${item.lectureEndDate}`}</div>
                <div>{`${item.lectureStrTime} ~ ${item.lectureEndTime}`}</div>
              </div>
            ))}
            {lectureList?.length <= 7 &&
              Array(7 - (lectureList?.length ?? 0))
                .fill()
                .map((_, index) => (
                  <div key={index} className="lecture-table-content">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ))}
          </div>
        </LectureTableLayout>
      </MiddleLayout>
      <FormTable>
        <Row col={2}>
          <div>이름</div>
          <div>{user?.name}</div>
          <div>성별</div>
          <div>{(user?.gender === 'M' && '남') || (user?.gender === 'F' && '여')}</div>
        </Row>
        <Row col={2}>
          <div>생년월일</div>
          <div>{user?.birthdate}</div>
          <div>전공</div>
          <div>{user?.majorName}</div>
        </Row>
        <Row col={2}>
          <div>등록일</div>
          <div>{user?.createdAt?.split('T')[0]}</div>
          <div>퇴직 여부</div>
          <div>{(user?.delYn === 0 && '재직 중') || (user?.delYn === 1 && '퇴직')}</div>
        </Row>
        <Row col={2}>
          <div>
            {!disabled ? <FontAwesomeIcon icon={faPencil} /> : null}
            휴대전화
          </div>
          <div>
            <Input
              type="text"
              isForm={true}
              placeholder="010-0000-0000"
              reset={setPhone}
              maxLength={13}
              value={phone}
              setValue={handlePhoneChange}
              disabled={disabled}
            />
          </div>
          <div>
            E-mail
            {!disabled ? <FontAwesomeIcon icon={faPencil} /> : null}
          </div>
          <div>
            {user?.email ? (
              <Input
                type="text"
                isForm={true}
                placeholder="smartgrade@green.ac.kr"
                reset={setEmail}
                value={email}
                setValue={handleEmailChange}
                disabled={disabled}
              />
            ) : (
              <span>(정보 수정 필요)</span>
            )}
          </div>
        </Row>
        <Row>
          <div>
            주소
            {!disabled ? <FontAwesomeIcon icon={faPencil} /> : null}
          </div>
          <div>
            {user?.address ? (
              <Input
                type="text"
                isForm={true}
                placeholder="주소를 입력하세요."
                reset={setAddress}
                value={address}
                setValue={handleAddressChange}
                disabled={disabled}
              />
            ) : (
              <span>(정보 수정 필요)</span>
            )}
          </div>
        </Row>
      </FormTable>
    </UserLayout>
  );
};

export default Mypage;
