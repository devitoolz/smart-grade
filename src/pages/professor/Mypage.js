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
  ModifyImage,
  CancelModifyButton,
} from '../../styles/UserStyle';
import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice from '../../slices/mainSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faPencil, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { checkValidEmail, checkValidPhone } from '../../modules/regex';
import api from '../../api/api';

const Mypage = () => {
  const [disabled, setDisabled] = useState(true);
  const [img, setImg] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const { user } = useSelector(state => state.main);
  const dispatch = useDispatch();

  const main = mainSlice.actions;

  useEffect(() => {
    if (user?.profile.pic) {
      setImg(
        user?.profile.pic.startsWith('blob')
          ? user?.profile.pic
          : `http://192.168.0.144:5002/imgs/professor/${user?.profile.iprofessor}/${user?.profile.pic}`
      );
    }
    setPhone(user?.profile.phone);
    setEmail(user?.profile.email);
    setAddress(user?.profile.address);
  }, [user]);

  const handleEdit = async () => {
    if (!(phone && email && address)) {
      alert('입력되지 않은 정보가 있습니다.');
      return;
    }

    if (!checkValidPhone(phone)) {
      alert('올바르지 않은 전화번호입니다.');
      return;
    }

    if (!checkValidEmail(email)) {
      alert('올바르지 않은 이메일입니다.');
      return;
    }

    try {
      // TODO: API 작업
      const formData = new FormData();

      const payload = {
        phone,
        email,
        address,
      };

      if (imgFile) {
        const res = await api.delete(`/api/professor`);
        console.log(res.data);
      }

      formData.append('pic', imgFile);
      formData.append('dto', JSON.stringify(payload));

      const { data } = await api.put(`/api/professor`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(data);

      dispatch(
        main.setUser({ ...user, profile: { ...user.profile, phone, email, address, pic: img } })
      );
      setDisabled(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateImage = e => {
    const file = e.target.files[0];
    setImgFile(file);
    setImg(file ? URL.createObjectURL(file) : null);
  };

  const handleRemoveImage = () => {
    setImgFile(null);
    setImg(null);
  };

  const handleCancel = () => {
    setPhone(user?.profile.phone);
    setEmail(user?.profile.email);
    setAddress(user?.profile.address);
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
    setEmail(value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9-_.@]/g, ''));
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
          {img ? <img src={img} alt="프로필 이미지" /> : <FontAwesomeIcon icon={faUser} />}
          {!disabled && (
            <ModifyImage>
              <label>
                <FontAwesomeIcon icon={faPencil} />
                수정
                <input type="file" accept="image/jpeg, image/png" onChange={handleUpdateImage} />
              </label>
              <CancelModifyButton onClick={handleRemoveImage}>
                <FontAwesomeIcon icon={faTrash} />
                삭제
              </CancelModifyButton>
            </ModifyImage>
          )}
        </ProfileImage>
        <LectureTableLayout>
          <div className="lecture-table-header">
            <div>강의명</div>
            <div>강의 기간</div>
            <div>강의 시간</div>
          </div>
          <div className="lecture-table-body">
            {user?.lectureList?.length === 0 && (
              <div className="lecture-table-no-content">
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span>강의 중인 강의가 없습니다.</span>
              </div>
            )}
            {user?.lectureList?.map((item, index) => (
              <div key={index} className="lecture-table-content">
                <div>{item.lectureName}</div>
                <div>{`${item.lectureStrDate} ~ ${item.lectureEndDate}`}</div>
                <div>{`${item.lectureStrTime} ~ ${item.lectureEndTime}`}</div>
              </div>
            ))}
            {user?.lectureList?.length <= 7 &&
              Array(7 - (user?.lectureList?.length ?? 0))
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
          <div>{user?.profile.name}</div>
          <div>성별</div>
          <div>
            {(user?.profile.gender === 'M' && '남') || (user?.profile.gender === 'F' && '여')}
          </div>
        </Row>
        <Row col={2}>
          <div>생년월일</div>
          <div>{user?.profile.birthdate}</div>
          <div>전공</div>
          <div>{user?.profile.majorName}</div>
        </Row>
        <Row col={2}>
          <div>등록일</div>
          <div>{user?.profile.createdAt?.split('T')[0]}</div>
          <div>퇴직 여부</div>
          <div>
            {(user?.profile.delYn === 0 && '재직 중') || (user?.profile.delYn === 1 && '퇴직')}
          </div>
        </Row>
        <Row col={2}>
          <div>
            {!disabled && <FontAwesomeIcon icon={faPencil} />}
            휴대전화
          </div>
          <div>
            <Input
              type="text"
              isForm={true}
              placeholder="010-0000-0000"
              reset={setPhone}
              maxLength={13}
              value={phone || ''}
              setValue={handlePhoneChange}
              disabled={disabled}
            />
          </div>
          <div>
            E-mail
            {!disabled && <FontAwesomeIcon icon={faPencil} />}
          </div>
          <div>
            {user?.profile.email ? (
              <Input
                type="text"
                isForm={true}
                placeholder="smartgrade@green.ac.kr"
                reset={setEmail}
                value={email || ''}
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
            {!disabled && <FontAwesomeIcon icon={faPencil} />}
          </div>
          <div>
            {user?.profile.address ? (
              <Input
                type="text"
                isForm={true}
                placeholder="주소를 입력하세요."
                reset={setAddress}
                value={address || ''}
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
