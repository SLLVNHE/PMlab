import React from 'react'
import './index.less'
import { Card, Rate } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'umi';
const { Meta } = Card;
import list from "@/static/images/list1.png";

// const data = {
//     id: 1,
//     name: "国际视野",
//     url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
//     type: "校园招聘",
//     address: "光华楼西",
//     start_time: "2020-10-12 10:00",
//     end_time: "2020.10.12 11:00",
//     description: "腾讯校园招聘,只要最好的你不服韶光"
// }

const  ShowCard = (props) => {

    const {data} = props
    
        return (
            <div className="showcard">
                {
                    Object.keys(data)?.length ?
                    <Link to={`/details?id=${data.id}`} target="_blank">

                <Card
                    hoverable={true}
                   
                    className="card_meta"
                    cover={<img alt="example" className="card_img" src={list} />}
                    
                >
                    <div className="name">
                        <div id="name" className="card-data">{data.name}</div>
                    </div>
                    <div className="type_add">
                   
                        <span className="card-data card_des">{data.type}</span><span className="card-data card_des">{data.address}</span>
                    </div>
                    <div className="time">
                        {/* <Rate allowHalf disabled={true} style={{fontSize:16}} defaultValue={2.5} /> */}
                        <span>{data.start_time}</span>
                    </div>

                </Card>

                </Link>  : null
                }
                
               

            </div>

        )
    }


export default ShowCard
