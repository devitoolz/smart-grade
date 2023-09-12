import { useNavigate } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';

const StudentsDetail = () => {
  const url = `/api/professor/grade/list`;
  const { data, pending, error } = useQuerySearch(url);

  const navigate = useNavigate();
  const pagemove = () => {
    navigate('/professor/students');
  };
  const tableHeader = [
    {
      title: '학년',
      width: '0.5',
    },
    {
      title: '전공 ',
      width: '1',
    },
    {
      title: '학번',
      width: '1',
    },
    {
      title: '이름 ',
      width: '0.5',
    },
    {
      title: '성별',
      width: '0.5',
    },
    {
      title: '전화번호',
      width: '1.0',
    },
  ];
  return (
    <div style={{ marginTop: '90px' }}>
      <CommonButton btnType="page" value="뒤로가기" onClick={pagemove} />
      <Table
        header={tableHeader}
        data={data?.lecturelist}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.lecturelist?.map(item => {
          return (
            <div key={item.ilectureStudent}>
              <div>{item.grade}</div>
              <div>{item.majorName}</div>
              <div>{item.studentNum}</div>
              <div>{item.studentName}</div>
              <div>{item.gender === 'M' ? '남' : '여'}</div>
              <div>{item.phone}</div>
            </div>
          );
        })}
      </Table>
    </div>
  );
};

export default StudentsDetail;
