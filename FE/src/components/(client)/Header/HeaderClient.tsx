import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { Link, NavLink } from "react-router-dom";

// css
import styles from './headerClient.module.scss';

const Header = () => {
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
                            <form action="">
                                {/* gán loading = true để hiện animation loading*/}
                                <Search placeholder="Tìm kiếm" />
                            </form>
                        </div>

                        <div className="cart">
                            <Link to={''}>
                                <ShoppingCartOutlined />
                            </Link>
                        </div>

                        <div className="wishlist">
                            <Link to={''}>
                                <UserOutlined />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header