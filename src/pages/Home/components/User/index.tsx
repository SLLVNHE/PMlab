import React from 'react';
import './index.less';
import { Menu, Dropdown } from 'antd';
import { UserOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, history } from 'umi';
const { SubMenu } = Menu;


const logout = ()=>{
  localStorage.removeItem('use-id')
  localStorage.removeItem('x-auth-token')
  history.push('/login');


  
}

const menu = (
  // <Menu className="menu">
  //   <Menu.Item className="item" icon={<UserOutlined />}>
  //     {/* <a target="_blank" className="a-item" rel="noopener noreferrer" href="http://www.alipay.com/"> */}
  //      我的信息
  //     {/* </a> */}
  //   </Menu.Item>
  //   <Menu.Item className="item" icon={<PlusOutlined />} >
  //     {/* <a target="_blank" className="a-item" rel="noopener noreferrer" href="http://www.taobao.com/"> */}
  //     <Link to='/userInfo'>
  //     我的报名
  //     </Link>

  //     {/* </a> */}
  //   </Menu.Item>

  //   <Menu.Item className="item" icon={<PlusOutlined />} >
  //     {/* <a target="_blank" className="a-item" rel="noopener noreferrer" href="http://www.taobao.com/"> */}
  //     <a>登出</a>

  //     {/* </a> */}
  //   </Menu.Item>
  // </Menu>



  <Menu>
    <Menu.Item icon={<UserOutlined />}>
      <Link to="/userInfo" target="_blank" className="a_item">
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
