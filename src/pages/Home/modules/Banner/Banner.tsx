import React from 'react';
import './Banner.less';
import { Carousel, Dropdown } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import ad1 from '@/static/images/ad1.png';
import ad2 from '@/static/images/ad2.png';

const data = {
  url:
    'https://yida.alibaba-inc.com/fileHandle?appType=APP_Q3BKKN8M9OYDU6XSK51Q&fileName=259cbb06-563f-4f45-ba2d-3daad1fd5a7e.jpg&instId=&type=open',
  url2:
    'http://phoenix-buttonwood-api-zbprod-zb1-oss-1.oss-cn-zhangjiakou.aliyuncs.com/b/89/1c8e3db6d515d8304fcdf5b2989d3jpeg.jpeg',
};

const Banner = () => {
  return (
    <div className="banner_card">
      <div className="banner_block">
        <Carousel autoplay className="carousel">
          <div>
            <div
              className="banner"
              style={{ backgroundImage: `url(${data.url})` }}
            ></div>
          </div>
          <div>
            <div
              className="banner"
              style={{ backgroundImage: `url(${data.url2})` }}
            ></div>
          </div>
        </Carousel>
      </div>
      <div className="banner_img">
        <div className="banner_img_1">
          <img src={ad1} className="img_1" />
        </div>
        <div className="banner_img_2">
          <img src={ad2} className="img_1" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
