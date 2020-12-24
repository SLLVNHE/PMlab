import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import './Footer.less';
import { Layout, Menu, Button, Divider,  Avatar,Image } from 'antd';
import Logo from '../../components/Logo/Logo';
import User from '../../components/User';
import Search from '../SearchBar/Search';
import request from '@/common/request';

const { Footer } = Layout;

export default () => {
  
  return (
   <Footer>
       <div className='footer'>
           <span>
               青蛙易查 @ 2021
           </span>
       </div>
   </Footer>
  );
};
