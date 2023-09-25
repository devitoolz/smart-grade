# Smart Grade

#### 프론트엔드 리액트 개발자 양성 과정 2~3차 협업 프로젝트
<a target="_blank" href="https://devitoolz.notion.site/Smart-Grade-16edfa278b294dc3b734ac0331a3ef4f?pvs=4" ><img height="30" width="30" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg" />  Notion</a>
    
<a target="_blank" href="https://www.canva.com/design/DAFqdlZQ_Kw/ImlqE3lc4j39Pafd-eWYjQ/view?utm_content=DAFqdlZQ_Kw&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" ><img height="30" width="30" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/canva.svg" />  1차 발표 자료</a>
    
<a target="_blank" href="https://www.canva.com/design/DAFsJrG-sMY/16uoToOaZtHxGkM3KQzVqw/view?utm_content=DAFsJrG-sMY&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" ><img height="30" width="30" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/canva.svg" />  2차 발표 자료</a>

## 🎓  Smart Grade: 대학 성적 관리 서비스

React와 Spring Boot로 협업을 통해 개발된 **대학 성적 관리 서비스** 입니다.

### `개발 기간`

🕰️  2023.07.14 ~ 2023.09.14

### `공통 컴포넌트 문서`

https://devitoolz.notion.site/Custom-Component-184d3ab1fd0146ad960b395a049156ac?pvs=4

## 🎥  시연

![2차](https://github.com/devitoolz/smart-grade/assets/4100341/c55ee7d8-b1f7-4137-9941-baf8e2482940)  2차
![3차](https://github.com/devitoolz/smart-grade/assets/4100341/629a5725-3dd4-4b76-84c9-a9ad4936c8bb)  3차

시연 영상 YouTube (2차) : https://youtu.be/yoO-EUvjzqU  
시연 영상 YouTube (3차) : https://youtu.be/HvXvZ4t30IA

배포 URL : https://web-smart-grade-2rrqq2blmpn233b.sel5.cloudtype.app

## 👥  팀 구성

#### 👤  박상렬 (2차 👑)

- 프로젝트 배포
- 전체적인 UI, 프로젝트 세팅, 공통 컴포넌트 제작
- 로그인 페이지
- 관리자 / 교수 / 학생 - 대시보드 페이지, 마이 페이지
- 관리자 - 계정 관리(교수 계정 관리, 학생 계정 관리) 페이지
- 교수 - 강의 개설 신청 페이지
- 학생 - 수강 신청 페이지

#### 👤  황지현 (3차 👑)

- 공통 컴포넌트 제작
- 관리자 / 교수 / 학생 - 공지사항 페이지
- 관리자 - 학사 관리(통합 강의 관리, 강의 요청 관리, 통합 성적 관리) 페이지
- 교수 - 성적 관리 페이지
- 학생 - 성적 조회 페이지

#### 👤  오영지

- 관리자 - 대학 관리(강의실 관리, 전공 관리) 페이지
- 교수 / 학생 - 강의 조회 페이지
- 교수 - 수강생 조회 페이지

## 🛠️  사용 기술

<div>
  <img src="https://img.shields.io/badge/Html-E34F26?style=for-the-badge&logo=Html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  <img src="https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
</div>

## 📠  협업 도구

<div>
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/google%20sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white">

</div>

## 📌  주요 기능

### `로그인`

- 로그인 시 Google OTP를 통한 2차 인증
- 비밀번호 찾기 시 OTP 인증 후 비밀번호 변경
- OTP 등록을 못한 경우, 등록한 이메일로 QR 코드 전송
- 최초 로그인 시 마이 페이지로 강제 이동

### `공통`

- 공지사항
    - 공지사항 작성, 수정, 삭제는 관리자만 허용
    - 공지 작성 시 다중 이미지 업로드 가능
    - 중요 공지, 일반 공지 분리하여 작성 가능
- 마이 페이지
    - 최초 로그인 시 초기 비밀번호 수정 강제
    - 이메일 등록 시 이메일 인증 강제

### `관리자`

- 대시보드
    - 연도별 입학생 추이를 남, 여로 구분하여 그래프로 시각화
    - 최근 추가된 교수 및 학생 계정 열람
- 계정 관리
    - 교수 및 학생 계정 등록
    - 전체 목록 엑셀 파일로 다운로드 가능
    - 엑실 양식을 활용하여 일괄 업로드 가능
        - 양식에 맞지 않을 경우 오류 내용 표시
- 학사 관리
    - 통합 성적 관리 - 특정 학생 통합 성적 조회
    - 통합 강의 관리 - 대학 내 강의 목록 조회 및 강의 개설
    - 강의 요청 관리 - 강의 개설, 개강 승인 및 거절
- 대학 관리
    - 강의실 관리 - 대학 내 강의실 목록 조회 및 강의실 등록 / 삭제
    - 전공 관리 - 대학 내 전공 목록 조회 및 전공 등록 / 삭제

### `교수`

- 강의 조회
    - 해당 교수의 전체 강의 목록 조회
- 성적 관리
    - 해당 교수가 현재 강의 중인 강의 목록 조회
    - 각 강의별 이의 신청 처리 및 성적 입력 가능
- 강의 개설 신청
    - 개설 대기, 개설 승인된 강의 목록 조회
    - 상세보기 클릭 시 개설 신청 시 입력한 해당 강의의 상세 정보 출력
    - 강의 개설 기간이 아닐 경우 진입 불가
    - 개설 신청 가능
        - 강의실 선택 시 해당 강의실 시간표 출력 및 강의 희망 시간 선택
        - ISBN 13자리 입력 시 해당 교재명 및 교재 이미지 자동 등록
- 수강생 조회
    - 해당 교수가 현재 강의 중인 강의들의 수강생 조회 가능

### `학생`

- 강의 조회
    - 해당 학생의 수강 이력 조회
- 성적 조회
    - 해당 학생의 강의별 성적 조회
    - 성적 이의 신청 가능
    - 전체 강의별 성적 데이터 엑셀 파일로 다운로드 가능
- 수강 신청
    - 개설 승인된 강의 목록 조회, 버튼을 통해 수강 신청 및 취소 가능
    - 상세보기 클릭 시 해당 강의의 상세 정보 출력
    - 수강 신청 기간이 아닐 경우 진입 불가
