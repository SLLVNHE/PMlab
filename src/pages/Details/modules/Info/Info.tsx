import React, { useEffect, useRef, useState, useMemo } from 'react';
import './Info.less';
// import { Map, APILoader, Marker } from '@uiw/react-amap';
import { Map, Marker } from 'react-amap';
import {
  Card,
  Modal,
  Rate,
  Divider,
  Drawer,
  Button,
  Empty,
  List,
  Calendar,
  Tooltip,
  Avatar,
  Comment,
  Anchor,
  Tabs,
  Form,
  Input,
  message,
  Descriptions,
  Tag
} from 'antd';

const { TextArea } = Input;
import {
  FireOutlined,
  EnvironmentOutlined,
  EditOutlined,
  ScheduleOutlined,
  UserOutlined,
} from '@ant-design/icons';
// import { Link } from 'umi';
import list2 from '@/static/images/list2.png';
import moment from 'moment';
import CountDown from '@/components/CountDown';
import request from '@/common/request';

moment.locale('zh-cn');
message.config({
  top: 100,
  // duration: 2,
  // maxCount: 3,
  // rtl: true,
  // prefixCls: 'my-message',
});


const mapKey = '742d55cec9c320cfe5942d613c870978';
const { TabPane } = Tabs;
const { Link } = Anchor;

interface IInfoProps {
  activityName: string;
  host: {
    id: string;
    username: string;
  };
  type: string;
  introduction: string;
  picture: string;
  activityVenue: string;
  capacity: number;
  currentNumber: number;
  activityStartTime: string;
  activityEndTime: string;
  signUpStartTime: string;
  signUpEndTime: string;
  enrolled: number;
  status?: number;
  comments: [];
}
const InfoData = {
  activityName: '',
  host: {
    id: '',
    username: '',
  },
  type: '',
  introduction: '',
  picture: '',
  activityVenue: '',
  capacity: 0,
  currentNumber: 0,
  activityStartTime: '',
  activityEndTime: '',
  signUpStartTime: '',
  signUpEndTime: '',
  enrolled: 0,
  comments: [],
};



const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Info = props => {
  const {id} = props
  const targetRef = useRef(null);
  const [isShow, setisShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [loctionx, setloctionx] = useState(31.296426);
  const [loctiony, setloctiony] = useState(121.503584);
  const [data, setdata] = useState<IInfoProps>(InfoData);
  const [submitting, setsubmitting] = useState(false);
  const [value, setvalue] = useState('');
  const [time, settime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [status, setstatus] = useState(0);


  const handleChange = e => {
    setvalue(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModal2 = () => {
    setIsModal2Visible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCancel2 = () => {
    setIsModal2Visible(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const refresh = ()=>{
    request('/api/activityDetails', {
      method: 'GET',
      params: { activityId: id },
    })
      .then(function(response) {
        setdata(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    request('/api/writeReview', {
      method: 'POST',
      data: {
        activityId: id,
        //  userId: localStorage.getItem('use-id'),
        text: value,
        score:5
      },
    })
      .then(function(response) {
        refresh()
      })
      .catch(function(error) {
        console.log(error);
      });

    setsubmitting(true);

    setTimeout(() => {
      setsubmitting(false);
      setvalue('');
    }, 1000);
  };

  useEffect(() => {
    refresh()
  }, []);

  useEffect(() => {
    const width = targetRef.current ? targetRef.current.clientWidth : 0;
    const width2 = targetRef.current ? targetRef.current.scrollWidth : 0;
    // console.log(width, width2);
    setisShow(width < width2);
  });



  useEffect(() => {
    window.AMap.plugin('AMap.PlaceSearch', function() {
      var search = new window.AMap.PlaceSearch();
      search.search(data.activityVenue, function(status, result) {
        const locx = result.poiList?.pois[0]?.location.Q
          ? result.poiList?.pois[0].location.Q
          : 31.296426;
        const locy = result.poiList?.pois[0]?.location.R
          ? result.poiList?.pois[0].location.R
          : 121.503584;
        setloctionx(locx);
        setloctiony(locy);
      });
    });
  }, [data]);


  useEffect(() => {
    const date1 = new Date(data.signUpEndTime); //开始时间
    const date2 = new Date(); //结束时间
    const date3 = date1.getTime() - date2.getTime(); //时间差秒
    //计算出相差天数
    const days = Math.floor(date3 / (24 * 3600 * 1000));
    //计算出小时数
    const leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    const leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    const leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    const seconds = Math.round(leave3 / 1000);
    const date = new Date().getTime();
    if (data.signUpEndTime > date && date > data.signUpStartTime) {
      setstatus(0);
    } else {
      setstatus(1);
    }
    settime({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  }, [data]);

  function callback(key) {
    console.log(key);
  }

  const handleSignup = ()=>{
    request('/api/activityEnrollment', {
      method: 'GET',
      params: { activityId: id },
    })
      .then(function(response) {
        message.success('报名成功');
        refresh()
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const handleSigndown = ()=>{
    request('/api/retreatEnrollment', {
      method: 'GET',
      params: { activityId: id },
    })
      .then(function(response) {
        message.success('取消报名成功');
        refresh()
      })
      .catch(function(error) {
        console.log(error);
      });
  }



  

  return (
    <div className="details_info">
      <div className="details_info_H">
        <div className="details_info_H1">
  <div className="details_info_head">{data.activityName} <Tag color="blue"> {data.type}</Tag></div>
          <div className="details_info_data">
            <EnvironmentOutlined style={{ color: '#acb4bf' }} />
            {data.activityVenue}
            <a style={{ marginLeft: 10 }} onClick={showModal}>
              {' '}
              显示地图
            </a>
          </div>
          <div className="details_info_host">
            <UserOutlined style={{ color: '#acb4bf' }} />
            主办单位：{data.host.username}
          </div>
        </div>
        <div className="details_info_H2">
          {status === 0  ? (
            <div className="details_info_H2_time">
              <div className="details_info_H2_time_p" style={{ color: 'red' }}>
                报名时间仅剩
              </div>
              <CountDown
                day={time.days}
                hours={time.hours}
                minutes={time.minutes}
                seconds={time.seconds}
              />
            </div>
          ) : null}

          {/* <div className="info_btn"> */}
          {status == 0 && data.enrolled == 0 ? (
            <Button
              type="primary"
              className="details_info_H2_join_btn"
              size="large"
              onClick={handleSignup}
            >
              立即报名
            </Button>
          ) : null}
          {status == 0 && data.enrolled == 1 ? (
            <Button
              type="primary" danger
              className="details_info_H2_join_btn"
              size="large"
              onClick={handleSigndown}
            >
              取消报名
            </Button>
          ) : null}

          {status != 0 ? (
            <Button
              type="primary"
              danger
              disabled
              className="details_info_H2_join_btn"
              size="large"
            >
              已结束
            </Button>
          ) : null}

          {/* </div> */}
        </div>
      </div>

      <div className="details_info_content">
        <div className="details_info_img">
          <img className="details_info_img_img" src={`http://175.24.120.91/images/${data.picture}`} alt="" />
        </div>
        <div className="details_info_block">
          <Divider />
          <div className="details_info_block_mark">
            {status !== 1 ? (
              <div className="details_info_block_mark_hot">
                <FireOutlined style={{ color: '#FF6B37' }} />
                （火热报名中){data.currentNumber}/{data.capacity}
                <span className="details_info_block_mark_hot_1">
                  名额仅剩 {Number(data.capacity) - Number(data.currentNumber)}{' '}
                </span>
              </div>
            ) : (
              <div className="details_info_block_mark_mark">
                <span id="mark">4.7分</span>

                <div>
                  <Rate
                    allowHalf
                    disabled={true}
                    style={{ fontSize: 16, color: 'red' }}
                    defaultValue={4.7}
                  />
                </div>
              </div>
            )}
            <div onClick={showModal2} className="details_info_block_time">
              <ScheduleOutlined />{' '}
              {moment(new Date(data.activityStartTime)).format(
                'YYYY-MM-DD HH:mm',
              )}
              --
              {moment(new Date(data.activityEndTime)).format(
                'YYYY-MM-DD HH:mm',
              )}
            </div>
            {/* <Anchor>
              <Link
                href="#detail_card"
                title="显示当前活动留言"
                className="details_info_detail"
              />
            </Anchor> */}
          </div>
          <Divider />
          <div className="details_info_des" id="info_des" ref={targetRef}>
            简介：{data.introduction}
          </div>
          <Divider />
         
          <div className="details_info_block_map">
            <div className="details_info_map2">
            <Map 
         
          center={{longitude: loctiony, latitude: loctionx}}
          zoom={16}
        >
          <Marker position={{longitude: loctiony, latitude: loctionx}} />
        </Map>
              {/* <APILoader akay={mapKey}>
                <Map zoom={16} center={[loctiony, loctionx]}>
                  <Marker
                    visiable={true}
                    title="北京市"
                    offset={new AMap.Pixel(-13, -30)}
                    label={{
                      offset: new AMap.Pixel(20, 20),
                      direction: 'right',
                    }}
                    // position={new AMap.LngLat(loctiony, loctionx)}
                  />
                </Map>
              </APILoader> */}
            </div>
            <div className="details_info_mapinfo">
              <div className="details_info_mapinfo_text">
                {data.activityVenue}
              </div>
              <a onClick={showModal}> 查看地图</a>
            </div>
          </div>
          <Divider />
          {/* <Anchor>
            <Link
              href="#detail_card"
              title="显示活动详情"
              className="details_info_detail"
            />
          </Anchor> */}
         
        </div>
      </div>

      <div className="details_info_message" id="detail_card">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          onChange={callback}
          className="details_info_message_tab"
        >
          <TabPane tab="评价板" key="1">
            {data.comments?.length ? (
              <List
                className="comment-list"
                header={`${data.comments.length} 条留言`}
                itemLayout="horizontal"
                dataSource={data.comments}
                renderItem={item => (
                  <li>
                    <Comment
                      author={item.username}
                      avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      content={item.content}
                      datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                          <span>{moment().fromNow()}</span>
                        </Tooltip>
                      }
                    />
                  </li>
                )}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                  height: 60,
                }}
                description={<span>暂无留言</span>}
              >
                {/* <Button type="primary">Create Now</Button> */}
              </Empty>
            )}
            <Comment
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={
                <Editor
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </TabPane>
          <TabPane tab="活动详情" key="2" id="detail_card">
            <Descriptions title="活动详情" column={1}>
              <Descriptions.Item label="活动名称">
                {data.activityName}
              </Descriptions.Item>
              <Descriptions.Item label="活动类型">
                {data.type}
              </Descriptions.Item>
              <Descriptions.Item label="主办方">
                {data.host.username}
              </Descriptions.Item>
              <Descriptions.Item label="活动地点">
                {data.activityVenue}
              </Descriptions.Item>
            <Descriptions.Item label="活动时间">{moment(new Date(data.activityStartTime)).format(
                'YYYY-MM-DD HH:mm'
              )}
              --
              {moment(new Date(data.activityEndTime)).format(
                'YYYY-MM-DD HH:mm',
              )}</Descriptions.Item>
              <Descriptions.Item label="报名时间">
              {moment(new Date(data.signUpStartTime)).format(
                'YYYY-MM-DD HH:mm',
              )}
              --
              {moment(new Date(data.signUpEndTime)).format(
                'YYYY-MM-DD HH:mm',
              )}
              </Descriptions.Item>
            </Descriptions>
            
          </TabPane>
        </Tabs>
      </div>

      <Modal
        title={data.activityVenue}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <a href="https://www.amap.com/" target="_blank">
            定位不准？ 去高德地图
          </a>,
        ]}
        width={900}
      >
        <div className="details_info_map">
        <Map 
          plugins={['ToolBar']}
          center={{longitude: loctiony, latitude: loctionx}}
          zoom={16}
        >
          <Marker position={{longitude: loctiony, latitude: loctionx}} />
        </Map>
          {/* <APILoader akay={mapKey}>
            <Map zoom={16} center={[loctiony, loctionx]}>
              <Marker
                visiable={true}
                title="北京市"
                offset={new AMap.Pixel(-13, -30)}
                label={{
                  offset: new AMap.Pixel(20, 20),
                  direction: 'right',
                }}
                position={new AMap.LngLat(loctiony, loctionx)}
              />
            </Map>
          </APILoader> */}
        </div>
      </Modal>

      <Modal
        title={
          status !== 1 ? (
            <div className="details_info_downtime">
              <span>距离活动报名仅剩</span>
              <CountDown
                day={time.days}
                hours={time.hours - 1}
                minutes={time.minutes}
                seconds={time.seconds}
              />
            </div>
          ) : (
            '报名已结束'
          )
        }
        visible={isModal2Visible}
        onCancel={handleCancel2}
        width={500}
        footer={null}
      >
        <div className="site-calendar-demo-card">
          <Calendar
            fullscreen={false}
            disabledDate={currentDate => {
              if (moment(data.activityStartTime) !== currentDate) {
                return true;
              } else {
                return false;
              }
            }}
            defaultValue={moment(data.activityStartTime)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Info;
