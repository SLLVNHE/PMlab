import React, { FC, useState } from 'react';
import { Link } from 'umi';
import './Details.less';
import { Layout, Menu, Breadcrumb } from 'antd';
import Header from '../Home/modules/Header/Header'
import Info from './modules/Info/Info';
import Footer from '../Home/modules/Footer/Footer';

const {Content } = Layout;



const Details: FC = (props) => {

    const id = props.location.query.id;
    
    return (

        <Layout className="layout">
            <Header /> 
            <Content className="info" >
            <Info id={id}/>
            </Content>
            <Footer />
        </Layout>

    );
}

export default Details
