import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <div className="h-screen">
                <div className="flex flex-col justify-center items-center h-full space-y-8">
                    <div className="">
                        <h2 className="font-bold text-8xl"><span className="text-red-500">404</span> Not Found</h2>
                    </div>


                    <div className="">
                        <p className="font-bold">Đường dẫn bạn mong muốn đã được thay đổi hoặc không tồn tại!</p>
                    </div>

                    <div className="">
                        <Link to={'/'} className="btn bg-red-500 rounded-full p-4 px-6 font-semibold text-white">Quay lại trang chủ</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound