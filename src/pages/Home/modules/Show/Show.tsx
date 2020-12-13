import React, { useState } from 'react';
import './Show.less';
import { Card, Row, Col, Space } from 'antd';
import { DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';
import ShowCard from '../../components/ShowCard';

const data = [
  {
    name: '活动名称',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    type: '校园招聘',
    address: '光华楼西',
    start_time: '2020.10.12 10:00',
    end_time: '2020.10.12 11:00',
    description: '腾讯校园招聘',
  },
  {
    name: '活动名称',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    type: '校园招聘',
    address: '光华楼东',
    start_time: '2020.10.12 10:00',
    end_time: '2020.10.12 11:00',
    description: '腾讯校园招聘',
  },
  {
    name: '活动名称',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    type: '校园招聘',
    address: '光华楼西',
    start_time: '2020.10.12 10:00',
    end_time: '2020.10.12 11:00',
    description: '腾讯校园招聘',
  },
  {
    name: '活动名称',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    type: '校园招聘',
    address: '光华楼西',
    start_time: '2020.10.12 10:00',
    end_time: '2020.10.12 11:00',
    description: '腾讯校园招聘',
  },
  {
    name: '活动名称',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    type: '校园招聘',
    address: '光华楼西',
    start_time: '2020.10.12 10:00',
    end_time: '2020.10.12 11:00',
    description: '腾讯校园招聘',
  },
  
];

function fillWithPlaceholder(list = [], size = 4, placeholder = {}, extra = 0) {
    if (list.length % size === (size - extra) % size) {
      return list
    }
    return fillWithPlaceholder(list.concat([placeholder]), size, placeholder, extra)
  }

const actionButtons = [
  { code: 1, text: '最新关注' },
  { code: 2, text: '热门推荐' },
];

const Show = (props) => {

  const [filter, setFilter] = useState<null | number>(1);
  return (

    <div className="show">
      <div className="show_head">
        <Space>
          {actionButtons.map(button => (
            <a
              onClick={e => setFilter(button.code)}
              key={button.code}
              className={'show_head_a' + (filter == button.code ? 'ctive' : '')}
            >
              {button.text}
            </a>
          ))}
        </Space>
      </div>
      <div className="show_card">
        {fillWithPlaceholder(data, 4,{}, 0).map(item => (
          <ShowCard data={item}/>
        ))}
      </div>
    </div>
  );
};

export default Show;
