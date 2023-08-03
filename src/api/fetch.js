import axios from 'axios';

export const handleTestClick = async (_setFunc, _setMaxPage) => {
  // try...catch
  try {
    const res = await axios.get('http://192.168.0.144:5002/api/admin/lecture?page=1');
    const result = await res.data;
    console.log('통신 데이터 : ', result);
    console.log('max page : ', result.page.maxPage);
    _setFunc(result.lectures);
    _setMaxPage(result.page.maxPage);
    return result.lectures;
  } catch (error) {
    console.log(error);
    // 임시 더미 데이터
    return [
      {
        buildingNm: '백매관',
        currentPeople: 5,
        delYn: 0,
        endDate: '2023-06-30',
        endTime: '10:00:00',
        ilecture: 4,
        isemester: 21,
        lectureNm: '물리학1',
        lectureRoomNm: '503호',
        maxPeople: 27,
        nm: '김재경',
        procedures: 0,
        strDate: '2023-03-04',
        strTime: '09:00:00',
      },
    ];
  }
};

export const handleGetStudentList = async (_ilecture, _pageIdx) => {
  try {
    const res = await axios.get(
      `http://192.168.0.144:5002/api/admin/lecture/${_ilecture}?page=${_pageIdx}`
    );
    const result = res.data;
    console.log('해당 과목을 듣는 학생리스트+성적');
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
