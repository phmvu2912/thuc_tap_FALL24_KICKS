import { RollbackOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";

// css
import { Dropdown, MenuProps, message, Modal, Space } from "antd";
import { useForm } from "react-hook-form";
import styles from './headerClient.module.scss';

const Header = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onSearch = (data: any) => {
        // console.log(data.query)
        navigate(`/search?query=${data.query}`);
    }

    const userStringfy = sessionStorage.getItem('userInfo');

    const userJSON = userStringfy ? JSON.parse(userStringfy) : null;

    console.log(userJSON);

    // Logout
    const logout = () => {
        if (!userJSON) return;

        Modal.confirm({
            title: 'Đăng xuất',
            content: 'Bạn có chắc chắn muốn đăng xuất tài khoản khỏi thiết bị này?',
            okText: 'Đăng xuất',
            cancelText: 'Hủy',
            centered: true,
            onOk() {
                sessionStorage.clear();

                navigate('/');

                message.success('Đăng xuất thành công!')
            },
            onCancel() {
                console.log('Đã hủy');
            },
        });
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label:
                userJSON ? (
                    <div className="w-[200px]">
                        <p className="font-semibold">{userJSON?.user?.username}</p>
                        <p className="text-gray-400">{userJSON?.user?.email}</p>
                    </div>
                ) : (
                    <div className="w-[200px] text-center">
                        Bạn chưa đăng nhập
                    </div>
                )
            ,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: userJSON && <Link to={'/profile'} className="flex items-center gap-2"> <UserOutlined />Hồ sơ</Link>,
        },
        {
            key: '4',
            label:
                userJSON ? (
                    <div 
                        className="text-white w-full hover:text-black flex items-center gap-2"
                        onClick={() => logout()}
                    >
                        <RollbackOutlined /> Đăng xuất
                    </div>
                ) : (
                    <Link to={'/login'} className="text-white w-full hover:text-black flex items-center gap-2">
                        <RollbackOutlined /> Đăng nhập
                    </Link>
                ),
            className: `${ userJSON ? 'bg-red-500 hover:bg-red-400' : 'bg-blue-500 hover:bg-blue-400' } `,
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
                            <Link to={userJSON ? '/cart' : '/login'}>
                                <ShoppingCartOutlined />
                            </Link>
                        </div>

                        <div className="account">
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