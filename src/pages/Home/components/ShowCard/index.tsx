import React from 'react';
import './index.less';
import { Card, Rate } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'umi';
const { Meta } = Card;
import list from '@/static/images/list1.png';

const ShowCard = props => {
  const { data } = props;

  return (
    <div className="showcard">
      {Object.keys(data)?.length ? (
        <Link to={`/details?id=${data.activityId}`}>
          <Card
            hoverable={true}
            className="card_meta"
            cover={
              <img
                alt="一张神秘的图片消失了"
                className="card_img"
                src={`http://175.24.120.91/images/${data.picture}`}
              />
            }
          >
            <div className="name">
              <div id="name" className="card-data">
                {data.activityName}
              </div>
            </div>
            <div className="type_add">
              <span className="card-data card_des">{data.type}</span>
              <span className="card-data card_des">{data.address}</span>
            </div>
            <div className="show_time">
             
              <span>{data.introduction}</span>
            </div>
          </Card>
        </Link>
      ) : null}
    </div>
  );
};

export default ShowCard;
