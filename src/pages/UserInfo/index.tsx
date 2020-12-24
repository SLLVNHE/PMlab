import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import './index.less';
import {
  Layout,
  Empty,
  Table,
  Tag,
  Space,
  Card,
  Tabs,
  Descriptions,
  message,
} from 'antd';
import Header from '../Home/modules/Header/Header';
import request from '@/common/request';
import Footer from '../Home/modules/Footer/Footer';
const { TabPane } = Tabs;

const { Content } = Layout;

// const data = [

//   {
//       activityName:'nij', activityId:5,
//       introduction:'xxx', type:'xxx',
//       picture:'xxx'
//   },
// ];

export default props => {
  const [acdata, setacdata] = useState([]);
  const [info, setinfo] = useState({});
  const refresh = () => {
    request('/api/enrolledActivity', {
      method: 'GET',
    })
      .then(function(response) {
        setacdata(response.activities);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handleSigndown = id => {
    request('/api/retreatEnrollment', {
      method: 'GET',
      params: { activityId: id },
    })
      .then(function(response) {
        message.success('取消报名成功');
        refresh();
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const columns = [
    {
      align: 'center',
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '活动简介',
      dataIndex: 'introduction',
      key: 'introduction',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '活动类型',
      key: 'type',
      dataIndex: 'type',
      textWrap: 'word-break',
      ellipsis: true,
      render: tags => <Tag color="blue">{tags}</Tag>,
    },
    {
      align: 'center',
      title: '操作',
      key: 'action',
      textWrap: 'word-break',
      ellipsis: true,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/details?id=${record.activityId}`} >
            详情
          </Link>
          <a onClick={() => handleSigndown(record.activityId)}>取消报名</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    refresh();
    request('/api/my_info', {
      method: 'GET',
    })
      .then(function(response) {
        setinfo(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const id = props.location.query.id;
  function callback(key) {
    console.log(key);
  }

  return (
    <Layout className="layout">
      <Header />

      <Content className="userinfo">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="我的信息" key="1">
            <Descriptions column={1}>
              <Descriptions.Item label="用户名">
                {info.username}
              </Descriptions.Item>
              <Descriptions.Item label="学工号">
                {info.workNumber}
              </Descriptions.Item>
              {/* <Descriptions.Item label="学工号">
              <img
                alt="一张神秘的图片消失了"
                className="card_img"
                src={`http://175.24.120.91/images/${info.avatar}`}
              />
              </Descriptions.Item> */}
            
            </Descriptions>
          </TabPane>
          <TabPane tab="我的活动" key="2">
            {acdata.length ? (
              <Card title="已报名活动">
                <Table
                  columns={columns}
                  dataSource={acdata}
                  className="userinfo_table"
                />
              </Card>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="暂无报名"
              />
            )}
          </TabPane>
        </Tabs>
      </Content>
      <Footer />
    </Layout>
  );
};
