import React, { useState } from 'react';
import './Register.less';
import { Form, Input, message, Button } from 'antd';
import { Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ver from '@/static/images/ver.png';
import {
  UserOutlined,
  LockOutlined,
  FieldNumberOutlined,
} from '@ant-design/icons';
import logo from '@/static/images/logo.png';
import { Link, history } from 'umi';
import VerificationCode from '@/components/VerificationCode';
import request from '@/common/request';

const formItemLayout = {
  // labelCol: { span: 0 },
  // wrapperCol: { span: 22 },
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const tailFormItemLayout = {
  wrapperCol: { offset: 2, span: 24 },
};
const tail2FormItemLayout = {
  wrapperCol: { offset: 8, span: 20 },
};

export default () => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);

  const onFinish = (values: any) => {
      console.log(values)
    request('/api/register', {
      method: 'POST',
      data: {
        username: values.username,
        password: values.password,
        workNumber:values.userid,
      },
    })
      .then(function(response) {
        if (response.message == 'success') {
            message.success('注册成功');
        //   history.push('/login');
        } else {
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <div className="register">
      <div className="img">
                <img src={logo} id='logo-img' />
            </div>
      <Card
        title="注册账户"
        headStyle={{ textAlign: 'center', fontSize: '25px' }}
        style={{ width: 500 }}
      >
        <Form
          className="register-form"
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码!',
                
              },
              {
                  min: 6,
                  message: '6-10位'
              },{
                  max: 10,
                  message: '6-10位'
              }
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认密码!',
              },
              {
                min: 6,
                message: '6-10位'
            },{
                max: 10,
                message: '6-10位'
            },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码不相同，请重新确认!');
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="userid"
            label="学工号"
            rules={[
              { required: true, message: '请输入学工号!', whitespace: true },
              {len: 6, message: '6位'}
            ]}
          >
            <Input
              prefix={<FieldNumberOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="ID number"
            />
          </Form.Item>

          <Form.Item label="验证码" name="ver-code">
            <VerificationCode
              imageUrl={ver}
              imageWidth={300}
              imageHeight={200}
              fragmentSize={50}
              onload={onload}
              onError={() => {
                setDisable(false);
              }}
              onMatch={() => {
                setDisable(true);
              }}
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={!disable} style={{ width: 360 }}>
              注册
            </Button>
          </Form.Item>
          <Form.Item {...tail2FormItemLayout}>
            <Link className="login-form-forgot" to="/login">
              已注册？去登录
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
