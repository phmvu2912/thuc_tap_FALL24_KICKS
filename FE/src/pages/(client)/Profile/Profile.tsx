import { Avatar } from "antd"
import { Link, Outlet } from "react-router-dom"

const Profile = () => {
  return (
    <div className="container mx-auto my-20">
        <div className="rounded-md border border-[#dedede]">
            <div className="top bg-[#bea4a4] rounded-t-md p-6 flex gap-4 items-stretch">
                <Avatar src={''} size={120}/>

                <div className="space-y-4">
                    <h5 className="text-xl font-semibold">Phạm Đào Vũ</h5>

                    <p className="font-semibold">Địa chỉ: <span className="font-normal">Hà Nội - Việt Nam</span></p>

                    <Link to={'/profile/update/'} className="underline ">Chỉnh sửa thông tin cá nhân</Link>
                </div>
            </div>

            <div className="main p-6">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Profile