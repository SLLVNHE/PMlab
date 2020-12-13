import React from 'react'
import './ShowT.less'
import { Card, Row, Col } from 'antd';
import { DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';
import ShowCard from '../../components/ShowCard';



const data = [
    {
        name: "活动名称",
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        type: "校园招聘",
        address: "光华楼西",
        start_time: "2020.10.12 10:00",
        end_time: "2020.10.12 11:00",
        description: "腾讯校园招聘"
    },
    {
        name: "活动名称",
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        type: "校园招聘",
        address: "光华楼西",
        start_time: "2020.10.12 10:00",
        end_time: "2020.10.12 11:00",
        description: "腾讯校园招聘"
    },
    {
        name: "活动名称",
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        type: "校园招聘",
        address: "光华楼西",
        start_time: "2020.10.12 10:00",
        end_time: "2020.10.12 11:00",
        description: "腾讯校园招聘"
    }, {

    }, {

    }, {

    }
]



class ShowT extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render(): React.ReactElement {
        return (

            <Card title={this.props.title}
                style={{ width: 1200 }}
                className="card"
                extra={<a className="card_more" href="#">更多<DoubleRightOutlined /></a>}
            >
                <Row gutter={[16, 24]}>
                    <Col>
                        <ShowCard />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                            <ShowCard />
                            </Col>
                            <Col>
                            <ShowCard />
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                            <ShowCard />
                            </Col>
                            <Col>
                            <ShowCard />
                            </Col>

                        </Row>
                    </Col>

                </Row>

            </Card>





        )
    }
}

export default ShowT
