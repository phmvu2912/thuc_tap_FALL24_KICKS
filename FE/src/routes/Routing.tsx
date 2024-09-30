import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/layouts/(client)/Homepage/Homepage'
import LayoutClient from '../pages/layouts/(client)/LayoutClient'

const Routing = () => {
    return (
        <>
            <Routes>
                {/* Client */}
                <Route element={<LayoutClient />}>
                    <Route index element={<Homepage />} />
                    {/* <Route index element={ } />
                    <Route index element={ } />
                    <Route index element={ } /> */}
                </Route>
            </Routes>
        </>
    )
}

export default Routing