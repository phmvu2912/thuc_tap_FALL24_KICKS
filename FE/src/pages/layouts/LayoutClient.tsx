import { FloatButton } from "antd"
import { Outlet } from "react-router-dom"
import Header from "../../components/(client)/Header/HeaderClient"
import Footer from "../../components/(client)/Footer/Footer"

const LayoutClient = () => {
    return (
        <>
            {/* Header */}
            <Header />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
            
            {/* Quay lên đầu trang */}
            <FloatButton.BackTop />
        </>
    )
}

export default LayoutClient