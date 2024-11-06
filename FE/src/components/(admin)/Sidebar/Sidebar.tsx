import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];


function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);


    const items: MenuItem[] = [
        getItem(<NavLink to={'/admin'}>Bảng diều khiển</NavLink>, '1', <PieChartOutlined />),
        getItem(<NavLink to={'/admin/products'}>Quản lý sản phẩm</NavLink>, '2', <DesktopOutlined />),
        getItem(<NavLink to={'/admin/categories'}>Quản lý danh mục</NavLink>, '3', <DesktopOutlined />),
        // getItem('User', 'sub1', <UserOutlined />, [
        //     getItem('Tom', '3'),
        //     getItem('Bill', '4'),
        //     getItem('Alex', '5'),
        // ]),
        // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        // getItem('Files', '9', <FileOutlined />),
    ];

    return (
        <>  
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="p-4 text-white font-bold text-center">KICKS</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>

        </>
    )
}

export default Sidebar