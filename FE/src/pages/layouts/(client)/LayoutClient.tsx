import { FloatButton } from "antd"
import { Outlet } from "react-router-dom"
import Header from "../../../components/(client)/Header/HeaderClient"

const LayoutClient = () => {
    return (
        <>
            {/* Header */}
            <Header />
            <main>
                <Outlet />
            </main>

            {/* Quay lên đầu trang */}
            <FloatButton.BackTop />
        </>
    )
}

export default LayoutClient