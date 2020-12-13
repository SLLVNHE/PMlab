import React, { useState,useEffect } from 'react';
import { Link } from 'umi';
import './Home.less';
import { Layout, Menu, Breadcrumb } from 'antd';
import Header from './modules/Header/Header'
import Banner from './modules/Banner/Banner';
import Search from './modules/SearchBar/Search';
import Show from './modules/Show/Show';
import ShowT from './modules/ShowT/ShowT';
import request from "@/common/request";

const {Content, Footer } = Layout;


export default () => {

    useEffect(() => {
        request('/api/enrolledActivity', { 
            // 请求方式
            method: 'GET',
           // 用data包裹参数是官方指定写法，如果data有参数umi-request会默认读取data里面参数。
            
        }).then(function(response) {
         
        })
        .catch(function(error) {
          console.log(error);
        });
    }, )

    


    return (
        <Layout className="layout">
            <Header />
           
            <Banner />  
            <Content className="content" >
                <Show title="校园招聘" type={0} />
                {/* <Show title="活动社团" type={0}/>
                <Show title="热门讲座" type={1}/>
                <ShowT title="热门讲座" type={0}/> */}
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Green Frog ©2018 Created by Frog UED</Footer> */}
        </Layout>



    );
}
