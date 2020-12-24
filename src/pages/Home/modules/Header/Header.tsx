import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import './Header.less';
import { Layout, Menu, Button, Divider,  Avatar,Image } from 'antd';
import Logo from '../../components/Logo/Logo';
import User from '../../components/User';
import Search from '../SearchBar/Search';
import request from '@/common/request';

const { Header } = Layout;

export default () => {
  const [info, setinfo] = useState({});

  useEffect(() => {
   
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
  return (
    <>
      <Header className="header">
        <div className="topbar">
          <div
            className="hd"
            onClick={() => {
              history.push('./home');
              window.location.reload();
            }}
          >
            <Logo />
            <Divider className="divider" type="vertical" />
            <span id="header-title">青蛙易查</span>
          </div>
          <div className="ft">
            <Search />
            <Divider className="divider" type="vertical" />
            <Avatar
              src={<Image src={`http://175.24.120.91/images/${info.avatar}`} />}
            />
            <User />
            <Divider className="divider" type="vertical" />
            <Button className="btn_link" type="primary" shape="round">
              联系我们
            </Button>
          </div>
        </div>
      </Header>
      <div style={{ height: 60 }}></div>
    </>
  );
};
