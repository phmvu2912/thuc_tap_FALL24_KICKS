import { RollbackOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";

// css
import { Dropdown, MenuProps, Space } from "antd";
import { useForm } from "react-hook-form";
import styles from './headerClient.module.scss';

const Header = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onSearch = (data: any) => {
        // console.log(data.query)
        navigate(`/search?query=${data.query}`);
    }


    const user = {
        name: 'Phạm Đào Vũ',
        email: 'phmvu2912@gmail.com'
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label:
                <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-400">{user.email}</p>
                </div>,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <Link to={'/profile'}>Hồ sơ</Link>,
            icon: <UserOutlined />,
        },
        {
            key: '4',
            label: <span className="text-white w-full hover:text-black flex items-center gap-2"><RollbackOutlined /> Đăng xuất</span>,
            className: 'bg-red-500 hover:bg-red-400',
        },
    ];

    return (
        <>
            <header className={`${styles['parent']} py-6`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className={`${styles['logo']}`}>
                        <p>KICKS</p>
                    </div>

                    <div className={`${styles['links']}`}>
                        <ul className="flex justify-between items-center space-x-6">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "text-[#DB4444] font-bold" : "text-black"
                                    }
                                >
                                    Trang chủ
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/products"
                                    className={({ isActive }) =>
                                        isActive ? "text-[#DB4444] font-bold" : "text-black"
                                    }
                                >
                                    Sản phẩm
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        isActive ? "text-[#DB4444] font-bold" : "text-black"
                                    }
                                >
                                    Liên hệ
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        isActive ? "text-[#DB4444] font-bold" : "text-black"
                                    }
                                >
                                    Giới thiệu
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={`${styles['action']} flex justify-end items-center space-x-6`}>
                        <div className="search">
                            <form
                                onSubmit={handleSubmit(onSearch)}
                                className="flex items-stretch w-full"
                            >
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    className="border p-2 text-sm outline-none"
                                    {...register('query', { required: true })}
                                />
                                <button
                                    type="submit"
                                    className="px-3 flex items-center justify-center bg-[#DB4444]"
                                >
                                    <SearchOutlined />
                                </button>
                            </form>
                        </div>

                        <div className="cart">
                            <Link to={''}>
                                <ShoppingCartOutlined />
                            </Link>
                        </div>

                        <div className="wishlist">
                            <Dropdown menu={{ items }} placement="bottomRight" className="cursor-pointer">
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <UserOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header