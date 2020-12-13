import React, { useState } from 'react';
import { Link } from 'umi';
import './Details.less';
import { Layout, Menu, Breadcrumb } from 'antd';
import Header from '../Home/modules/Header/Header'
import Info from './modules/Info/Info';

const {Content, Footer } = Layout;



export default (props) => {

    const id = props.location.query.id;
    return (

        <Layout className="layout">
            <Header /> 
            <Content className="info" >
            <Info />
            </Content>
        </Layout>



    );
}
