import React from "react";
import {
  Layout,
  Space,
  Button,
  Col,
  Row,
  Modal,
  Tabs,
  Menu,
  theme,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import LoginForm from "@/components/loginForm";
import RegisterForm from "@/components/registerForm";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  //   textAlign: "center",
  //   minHeight: 120,
  //   lineHeight: "120px",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

interface IBaseLayoutProps {
  children: React.JSX.Element;
}

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `register`,
    children: <RegisterForm />,
  },
  {
    key: "2",
    label: `login`,
    children: <LoginForm />,
  },
];

export default function BaseLayout(props: IBaseLayoutProps) {
  const { children } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickAuthen = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={false}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
              centered
              items={items}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Modal>
      <Layout style={{ width: "100%", minHeight: "110vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          theme="dark"
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={[
              UserOutlined,
              VideoCameraOutlined,
              UploadOutlined,
              UserOutlined,
            ].map((icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            }))}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Row style={{ width: "100%" }}>
              <Col span={24} style={{ textAlign: "right", paddingRight: 20 }}>
                <Button onClick={handleClickAuthen}>Authen</Button>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED ตี๋เขียนโค้ดอิอิ teeLnwZa55plus
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
