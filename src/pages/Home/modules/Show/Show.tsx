import React, { useEffect, useMemo, useState } from 'react';
import './Show.less';
import { Card, Row, Col, Space } from 'antd';
import { DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';
import ShowCard from '../../components/ShowCard';
import request from '@/common/request';

function fillWithPlaceholder(list = [], size = 4, placeholder = {}, extra = 0) {
  if (list.length % size === (size - extra) % size) {
    return list;
  }
  return fillWithPlaceholder(
    list.concat([placeholder]),
    size,
    placeholder,
    extra,
  );
}

const actionButtons = [
  { code: 1, text: '热门推荐' },
  { code: 2, text: '最新关注' },
];

const Show = props => {
  const { data } = props;
  
  const [data1, setdata1] = useState([]);
  const [list, setlist] = useState([]);
  const [filter, setFilter] = useState<null | number>(1);
  
  
  

  
  const handleset = code => {
    setFilter(code);
    if (code == 1) {
          setlist(data);
    } else {
      request('/api/enrolledActivity', {
        // 请求方式
        method: 'GET',
      })
        .then(function(response) {   
          setlist(response.activities);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };



 
  return (
    <div className="show">
      <div className="show_head">
        <Space>
          {actionButtons.map(button => (
            <a
              onClick={e => handleset(button.code)}
              key={button.code}
              className={'show_head_a' + (filter == button.code ? 'ctive' : '')}
            >
              {button.text}
            </a>
          ))}
        </Space>
      </div>
      <div className="show_card">
        {fillWithPlaceholder(list?.length ? list : data, 4, {}, 0).map(item => (
          <ShowCard data={item} />
        ))}
      </div>
    </div>
  );
};

export default Show;
