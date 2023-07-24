import React from 'react';
import { Outlet } from 'react-router-dom';

import { Content, Layout } from '../styles/AppStyle';

const Main = () => {
  return (
    <Layout>
      {/* <Sidebar /> */}
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Main;
