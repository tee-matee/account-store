import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import validator from "validator";

export default function LoginForm() {
  
  const callServiceLogin = async (values: any) => {
    const { email, password, remember } = values;
  };

  const onFinish = (values: any) => {
    callServiceLogin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="teelnwzalogin"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            validator: (_, value) => {
              if (!validator.isEmail(value)) {
                return Promise.reject("email type");
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          {
            validator: (_, value) => {
              if (!validator.isStrongPassword(value)) {
                return Promise.reject("!isStrongPassword");
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input.Password placeholder="Ex.Zx123456789!" />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 5, span: 19 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
        <Button type="default" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
