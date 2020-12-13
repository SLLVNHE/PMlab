import React, { useState } from 'react';
import { Link } from 'umi';
import './Header.less';
import { Layout, Menu, Button, Divider } from 'antd';
import Logo from '../../components/Logo/Logo';
import User from '../../components/User';
import Search from '../SearchBar/Search';

const { Header } = Layout;

export default () => {
  return (
    <>
      <Header className="header">
        <div className="topbar">
          <div className="hd">
            <Logo />
            <Divider className="divider" type="vertical" />
            <span id="header-title">绿蛙易查</span>
          </div>
          <div className="ft">
            <Search />
            <Divider className="divider" type="vertical" />
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
