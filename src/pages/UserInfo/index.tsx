import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import './index.less';
import { Layout, Empty, Table, Tag, Space, Card, Tabs } from 'antd';
import Header from '../Home/modules/Header/Header'
import request from '@/common/request';
const { TabPane } = Tabs;


const {Content, Footer } = Layout;




const columns = [
    {
        align: "center",
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
      
    },
    {
        align: "center",
      title: '活动简介',
      dataIndex: 'introduction',
      key: 'introduction',
    },
    {
        align: "center",
      title: '活动类型',
      key: 'type',
      dataIndex: 'type',
      render: tags => (
       
        <Tag color="blue">tags</Tag>
           
      ),
    },
    {
        align: "center",
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/details?id=${record.activityId}`} target="_blank">详情</Link>
          <a >取消报名</a>
        </Space>
      ),
    },
  ];

  const data = [
    
    {
        activityName:'nij', activityId:5,
        introduction:'xxx', type:'xxx',
        picture:'xxx'
    },
  ];


 



export default (props) => {
    const [acdata, setacdata] = useState([])

    useEffect(() => {
        request('/api/enrolledActivity', {
            method: 'GET',
          })
            .then(function(response) {
              setacdata(response.activities);
            })
            .catch(function(error) {
              console.log(error);
            });
        
    },[])

    const id = props.location.query.id;
    function callback(key) {
        console.log(key);
      }


    return (

        <Layout className="layout">
            <Header />
          
            <Content className="userinfo" >
           

<Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="我的信息" key="1">
     啥都没有
    </TabPane>
    <TabPane tab="我的活动" key="2">
    {
                data.length ?
                <Card title="已报名活动" >
                 <Table columns={columns} dataSource={acdata} className='userinfo_table'/>
              </Card>
                 :  
                 <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无报名" />
            }

    </TabPane>
   
  </Tabs>

           
            </Content>
           
        </Layout>



    );
}
