import React, { useEffect, useState } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import { DashboardContent, DashboardLayout } from '../../styles/DashboardStyle';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';
import { ObjectType } from '../../types/components';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<Serie[]>([]);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const { data } = await api.get<ObjectType>('/api/admin/student/ratio');

        const newData = ['man', 'female'].map(gender => ({
          id: gender === 'man' ? '남' : '여',
          data: data[gender].map((item: ObjectType) => ({ x: item.year, y: item.count })),
        }));

        setChartData(newData);
      } catch (err) {
        console.log(err);
      }
    };

    getChartData();
  }, []);

  const tableHeader = [
    { title: '전공', width: 5 },
    { title: '이름', width: 2 },
    { title: '성별', width: 1 },
  ];

  const professor = useQuerySearch('/api/admin/professor?size=9');
  const student = useQuerySearch('/api/admin/students?size=9');

  const professorList: Array<ObjectType> = (professor.data as ObjectType)?.professors;
  const studentList: Array<ObjectType> = (student.data as ObjectType)?.students;

  return (
    <DashboardLayout className="admin">
      <DashboardContent className="chart">
        <div className="title">
          <span>연도별 입학생 추이</span>
        </div>
        <ResponsiveLine
          data={chartData}
          theme={{
            fontSize: 14,
            fontFamily: 'Pretendard',
            axis: {
              legend: { text: { fontSize: 16, fontWeight: 'bold', fontFamily: 'Pretendard' } },
            },
          }}
          margin={{ top: 25, right: 20, bottom: 60, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 15,
            tickRotation: 0,
            legend: '연도',
            legendOffset: 50,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 15,
            tickRotation: 0,
            legend: '인원 수',
            legendOffset: -50,
            legendPosition: 'middle',
          }}
          colors={['var(--primary-color)', 'var(--negative-color)']}
          lineWidth={3}
          pointSize={12}
          pointColor="white"
          pointBorderWidth={3}
          pointBorderColor={{ from: 'serieColor' }}
          enablePointLabel={true}
          pointLabel="y"
          pointLabelYOffset={-12}
          enableCrosshair={false}
          crosshairType="x"
          useMesh={true}
          legends={[]}
        />
      </DashboardContent>
      <DashboardContent>
        <div className="title">
          <span>신규 교수 계정</span>
          <button onClick={() => navigate('/admin/user/professor')}>더보기</button>
        </div>
        <div>
          <Table
            header={[{ title: '교번', width: 2 }, ...tableHeader]}
            data={professorList}
            pending={professor.pending}
            error={professor.error}
            dashboard={9}
          >
            {professorList?.map(item => {
              return (
                <div key={item.iprofessor}>
                  <div>{item.iprofessor}</div>
                  <div>{item.majorName}</div>
                  <div>{item.nm}</div>
                  <div>{item.gender === 'M' ? '남' : '여'}</div>
                </div>
              );
            })}
          </Table>
        </div>
      </DashboardContent>
      <DashboardContent>
        <div className="title">
          <span>신규 학생 계정</span>
          <button onClick={() => navigate('/admin/user/students')}>더보기</button>
        </div>
        <div>
          <Table
            header={[{ title: '학번', width: 2 }, ...tableHeader]}
            data={studentList}
            pending={student.pending}
            error={student.error}
            dashboard={9}
          >
            {studentList?.map(item => {
              return (
                <div key={item.studentNum}>
                  <div>{item.studentNum}</div>
                  <div>{item.majorName}</div>
                  <div>{item.nm}</div>
                  <div>{item.gender === 'M' ? '남' : '여'}</div>
                </div>
              );
            })}
          </Table>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default Dashboard;
