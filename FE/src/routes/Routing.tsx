import { Route, Routes } from 'react-router-dom'
import LayoutClient from '../pages/layouts/LayoutClient'
import Homepage from '../pages/(client)/Homepage/Homepage'
import NotFound from '../pages/NotFound/NotFound'
import List_Products from '../pages/(client)/Products/List'
import LayoutAdmin from '../pages/layouts/LayoutAdmin'
import Dashboard from '../pages/(admin)/Dashboard/Dashboard'

const Routing = () => {
    return (
        <>
            <Routes>
                {/* Client */}
                <Route path='/' element={<LayoutClient />}>
                    <Route index element={<Homepage />} />
                    <Route path='/products' element={<List_Products />} />
                    <Route path='/' element={<p className='container mx-auto'>About</p>} />
                    <Route path='/' element={<p className='container mx-auto'>Contact</p>} />
                </Route>

                {/* Admin */}
                <Route path='/admin' element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />

                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Routing