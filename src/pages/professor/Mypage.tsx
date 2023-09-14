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
import { checkValidPhone } from '../../modules/regex';
import api from '../../apis/api';
import ChangePassword from '../../components/ChangePassword';
import OTPRegister from '../../components/OTPRegister';
import { PROFESSOR_IMG_URL } from './Main';
import { RootState } from '../../store';
import { LectureData, ProfessorProfileData } from '../../types/apis';
import ChangeEmail from '../../components/ChangeEmail';
import { dayData } from '../../modules/timetable';

const Mypage = () => {
  const [lectureList, setLectureList] = useState<Array<LectureData> | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [img, setImg] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [emailChanged, setEmailChanged] = useState<boolean>(false);
  const [openChangeEmail, setOpenChangeEmail] = useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [openOTPRegister, setOpenOTPRegister] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  const main = mainSlice.actions;

  console.log(email);

  useEffect(() => {
    if (user) {
      setLectureList(user.lectureList);
      setPhone(user.profile.phone);
      setEmail(user.profile.email);
      setAddress(user.profile.address);
      if (user.profile.pic) {
        setImg(
          user.profile.pic.startsWith('blob')
            ? user.profile.pic
            : `${PROFESSOR_IMG_URL}/${(user.profile as ProfessorProfileData).iprofessor}/${
                user.profile.pic
              }`
        );
      }
    }
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

    try {
      const formData = new FormData();

      const payload = {
        phone,
        email,
        address,
      };

      if (imgFile) formData.append('pic', imgFile);
      formData.append('param', JSON.stringify(payload));

      await api.put(`/api/professor`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(
        main.setUser({ ...user, profile: { ...user?.profile, phone, email, address, pic: img } })
      );
      setDisabled(true);

      if (!user?.profile.secretKey) {
        alert('프로필이 업데이트 되었습니다. OTP 등록을 위해 비밀번호 변경을 해 주세요.');
        setOpenChangePassword(true);
      } else {
        alert('프로필이 업데이트 되었습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    setImgFile(file);
    setImg(file ? URL.createObjectURL(file) : null);
  };

  const handleRemoveImage = () => {
    setImgFile(null);
    setImg(null);
  };

  const handleCancel = () => {
    if (user) {
      setPhone(user.profile.phone);
      setEmail(user.profile.email);
      setAddress(user.profile.address);
      setImg(
        user.profile.pic
          ? `${PROFESSOR_IMG_URL}/${(user.profile as ProfessorProfileData).iprofessor}/${
              user.profile.pic
            }`
          : null
      );
    }
    setDisabled(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(
      value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(-{1,2})$/g, '')
    );
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  return (
    <>
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
            {user?.profile.secretKey && (
              <Button onClick={() => setOpenChangePassword(true)}>비밀번호 변경</Button>
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
                  {img ? '수정' : '등록'}
                  <input type="file" accept="image/jpeg, image/png" onChange={handleUpdateImage} />
                </label>
                {img && (
                  <CancelModifyButton onClick={handleRemoveImage}>
                    <FontAwesomeIcon icon={faTrash} />
                    삭제
                  </CancelModifyButton>
                )}
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
              {lectureList ? (
                <>
                  {lectureList.map((item, index) => (
                    <div key={index} className="lecture-table-content">
                      <div>{item.lectureName}</div>
                      <div>{`${item.lectureStrDate} ~ ${item.lectureEndDate}`}</div>
                      <div>{`${item.lectureStrTime.slice(0, -3)} ~ ${item.lectureEndTime.slice(
                        0,
                        -3
                      )} ${dayData[item.dayWeek]}`}</div>
                    </div>
                  ))}
                  {lectureList.length === 0 && (
                    <div className="lecture-table-no-content">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      <span>강의 중인 강의가 없습니다.</span>
                    </div>
                  )}
                  {lectureList.length <= 7 &&
                    Array(7 - (lectureList?.length ?? 0))
                      .fill('')
                      .map((_, index) => (
                        <div key={index} className="lecture-table-content">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      ))}
                </>
              ) : (
                <>
                  {Array(7)
                    .fill('')
                    .map((_, index) => (
                      <div key={index} className="lecture-table-content">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ))}
                </>
              )}
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
            <div>{(user?.profile as ProfessorProfileData)?.createdAt?.split('T')[0]}</div>
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
            <div onClick={disabled ? undefined : () => setOpenChangeEmail(true)}>
              {user?.profile.email && !emailChanged ? (
                user?.profile.email
              ) : email ? (
                email
              ) : (
                <span>{disabled ? '(정보 수정 필요)' : 'E-mail을 등록하세요.'}</span>
              )}
            </div>
          </Row>
          <Row>
            <div>
              주소
              {!disabled && <FontAwesomeIcon icon={faPencil} />}
            </div>
            <div>
              <Input
                type="text"
                isForm={true}
                placeholder={
                  disabled && !user?.profile.address ? '(정보 수정 필요)' : '주소를 입력하세요.'
                }
                reset={setAddress}
                value={address || ''}
                setValue={handleAddressChange}
                disabled={disabled}
              />
            </div>
          </Row>
        </FormTable>
      </UserLayout>
      {openChangePassword && (
        <ChangePassword
          setOpenChangePassword={setOpenChangePassword}
          setOpenOTPRegister={setOpenOTPRegister}
        />
      )}
      {openOTPRegister && <OTPRegister setOpenOTPRegister={setOpenOTPRegister} />}
      {openChangeEmail && (
        <ChangeEmail
          setOpenChangeEmail={setOpenChangeEmail}
          setEmail={setEmail}
          setEmailChanged={setEmailChanged}
        />
      )}
    </>
  );
};

export default Mypage;
