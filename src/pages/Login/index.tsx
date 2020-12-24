import React, { useEffect, useState } from 'react';
import { Link, history } from 'umi';
import './Login.less';
import ver from '@/static/images/ver.png';
import logo from '@/static/images/logo.png';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import VerificationCode from '@/components/VerificationCode';
import request from '@/common/request';
import Atmia from '../Atmia';

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 1, span: 20 },
};

export default () => {
  const [disable, setDisable] = useState(false);
  const [onload, setonload] = useState(false);

  useEffect(() => {
    localStorage.removeItem("x-auth-token")
    localStorage.removeItem("use-id")
  }, [])

  const onFinish = (values: any) => {
    request('/api/login', {
      method: 'POST',
      data: {
        username: values.username,
        password: values.password,
      },
    })
      .then(function(response) {
        if (response.message == 'success') {
          window.localStorage.setItem('x-auth-token', response.token);
          window.localStorage.setItem('use-id', response.usrId);
          history.push('/home');
        } else {
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    setonload(!onload);
  };

  const handleLogin = () => {};

  return (
    <div className="login">
      <Atmia />
      {/* <div className="img">
        <img src={logo} id="logo-img" />
      </div> */}
      <Card
        title="登录账户"
        className="login_card"
        // bordered={false}
        headStyle={{ textAlign: 'center', fontSize: '25px' }}
        style={{ width: 500 }}
      >
        <Form
          className="login-form"
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
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
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              disabled={!disable}
              htmlType="submit"
              style={{ width: 360 }}
            >
              登录
            </Button>
          </Form.Item>

          <Form.Item>
            <a className="forget-pwd" href="">
              忘记密码
            </a>
            <Link className="login-form-forgot" to="/register">
              注册账户
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
