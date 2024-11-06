import { Layout, theme } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import Header from '../../components/(admin)/Header/Header';
import Sidebar from '../../components/(admin)/Sidebar/Sidebar';




const LayoutAdmin = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>

                <Sidebar />

                <Layout>
                    
                    <Header />

                    <Content style={{ margin: '0 16px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default LayoutAdmin