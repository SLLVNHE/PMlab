import React, { useState } from 'react';
import './Banner.less';
import { Carousel, Dropdown } from 'antd';
import { history, Link } from 'umi';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import ad1 from '@/static/images/ad1.png';
import ad2 from '@/static/images/ad2.png';
import { useEffect } from 'react';
import request from '@/common/request';

const data1 = {
  url:
    'https://yida.alibaba-inc.com/fileHandle?appType=APP_Q3BKKN8M9OYDU6XSK51Q&fileName=259cbb06-563f-4f45-ba2d-3daad1fd5a7e.jpg&instId=&type=open',
  url2:
    'http://phoenix-buttonwood-api-zbprod-zb1-oss-1.oss-cn-zhangjiakou.aliyuncs.com/b/89/1c8e3db6d515d8304fcdf5b2989d3jpeg.jpeg',
};

const Banner = props => {
  const { data } = props;
  return (
    <div className="banner_card">
      <div className="banner_block">
        {data.length > 2 ? (
          <Carousel autoplay className="carousel">
            <div className="banner_b">
              <Link to={`/details?id=${data[0]?.activityId}`}>
                <div
                  className="banner"
                  style={{
                    backgroundImage: `url(http://175.24.120.91/images/${data[0]?.picture})`,
                  }}
                ></div>
                <div className="banner_connet">{data[0]?.activityName}</div>
              </Link>
            </div>
            <div className="banner_b">
              <Link to={`/details?id=${data[1]?.activityId}`}>
                <div
                  className="banner"
                  style={{
                    backgroundImage: `url(http://175.24.120.91/images/${data[1]?.picture})`,
                  }}
                ></div>
                <div className="banner_connet">{data[1]?.activityName}</div>
              </Link>
            </div>
          </Carousel>
        ) : (
          <Carousel autoplay className="carousel">
            <div>
              <div
                className="banner"
                style={{ backgroundImage: `url(${data1.url})` }}
              ></div>
            </div>
            <div>
              <div
                className="banner"
                style={{ backgroundImage: `url(${data1.url2})` }}
              ></div>
            </div>
          </Carousel>
        )}
      </div>
      {data.length > 4 ? (
        <div className="banner_img">
          <div className="banner_img_1">
            <img src={`http://175.24.120.91/images/${data[3]?.picture}`} className="img_1" />
            <div className="banner_connet2">{data[3]?.activityName}</div>
          </div>
          <div className="banner_img_2">
            <img src={`http://175.24.120.91/images/${data[4]?.picture}`}  className="img_1" />
            <div className="banner_connet2">{data[4]?.activityName}</div>
          </div>
        </div>
      ) : (
        <div className="banner_img">
          <div className="banner_img_1">
            <img src={ad1} className="img_1" />
          </div>
          <div className="banner_img_2">
            <img src={ad2} className="img_1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
