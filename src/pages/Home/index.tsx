import React, { useState, useEffect, FC } from 'react';
import { history } from 'umi';
import './Home.less';
import { Layout, Menu, Breadcrumb } from 'antd';
import Header from './modules/Header/Header';
import Banner from './modules/Banner/Banner';
import Search from './modules/SearchBar/Search';
import Show from './modules/Show/Show';
import ShowT from './modules/ShowT/ShowT';
import request from '@/common/request';
import Footer from './modules/Footer/Footer';

const { Content } = Layout;

const Home: FC = () => {
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);

  useEffect(() => {
    request('/api/activityList', {
      // 请求方式
      method: 'GET',
    })
      .then(function(response) {
        setdata(response.activities);
      })
      .catch(function(error) {
        console.log(error);
      });

    request('/api/enrolledActivity', {
      // 请求方式
      method: 'GET',
    })
      .then(function(response) {
        setdata1(response.activities);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);


  return (
    <Layout className="layout">
      <Header />
      <Banner data={data.concat(data1)} />
      <Content className="content">
        <Show data={data.concat(data1)} title="校园招聘" type={0} />
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
