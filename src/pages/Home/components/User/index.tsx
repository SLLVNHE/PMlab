import React, { useState } from 'react';
import './index.less';
import { Menu, Dropdown } from 'antd';
import { UserOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, history } from 'umi';
import { useEffect } from 'react';
import request from 'umi-request';
const { SubMenu } = Menu;


const logout = ()=>{
  // localStorage.removeItem('use-id')
  // localStorage.removeItem('x-auth-token')
  history.push('/login');
}

const menu = (

  <Menu>
    <Menu.Item icon={<UserOutlined />}>
      <Link to="/userInfo" className="a_item">
        我的信息
      </Link>
    </Menu.Item>
    <Menu.Item icon={<LogoutOutlined />}>
      <a onClick={logout}>
        登出
      </a>
    </Menu.Item>
  </Menu>
);
const User = () => {
  

  return (
    <Dropdown
      overlay={menu}
      className="dropdown"
      placement="bottomCenter"
      arrow={true}
    >
        
   
  
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        个人中心
      </a>
    </Dropdown>
  );
};

export default User;
