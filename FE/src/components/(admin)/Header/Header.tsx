import { Avatar } from "antd"

const Header = () => {
    return (
        <header className="p-4">
            <div className="flex justify-between items-center">
                <h5 className="font-bold text-lg ">ADMINISTRATOR</h5>

                <div className="">
                    <Avatar size="large" src="https://i.pravatar.cc/300" className="border border-black rounded-full"/>
                </div>
            </div>
        </header>
    )
}

export default Header