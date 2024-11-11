import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <footer className="bg-[#2C2C2C] text-white py-6">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <div className="flex-1 flex flex-col">
                            <div className="logo">
                                <Link to={'/'} className="font-bold text-3xl">KICKS</Link>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col space-y-4">
                            <div className="heading">
                                <h5 className="font-bold text-lg">Hỗ trợ</h5>
                            </div>

                            <div className="item space-y-4">
                                <p><span className="font-semibold">Địa chỉ:</span> Mỹ Đình - Hà Nội - Việt Nam</p>

                                <p><span className="font-semibold">Email:</span> kicks@support.com</p>

                                <p><span className="font-semibold">Hotline:</span> +84 95439824</p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col space-y-4">
                            <div className="heading">
                                <h5 className="font-bold text-lg">Tài khoản</h5>
                            </div>

                            <div className="item flex flex-col space-y-4">
                                <Link to={''}>Tài khoản của tôi</Link>

                                <Link to={''}>Quên mật khẩu</Link>

                                <Link to={''}>Giỏ hàng</Link>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col space-y-4">
                            <div className="heading">
                                <h5 className="font-bold text-lg">Điều khoản</h5>
                            </div>

                            <div className="item flex flex-col space-y-4">
                                <Link to={''}>Điều khoản người dùng</Link>

                                <Link to={''}>Chính sách hoàn trả</Link>

                                <Link to={''}>FAQ</Link>

                                <Link to={''}>Liên hệ</Link>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-6 mt-6 border-t border-t-[#141414]">
                        <p className="text-gray-600 ">&copy; Bản quyền thuộc về vupdph34756</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer