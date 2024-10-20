import { Route, Routes } from 'react-router-dom'
import LayoutClient from '../pages/layouts/LayoutClient'
import Homepage from '../pages/(client)/Homepage/Homepage'
import NotFound from '../pages/NotFound/NotFound'
import List_Products from '../pages/(client)/Products/List'
import LayoutAdmin from '../pages/layouts/LayoutAdmin'
import Dashboard from '../pages/(admin)/Dashboard/Dashboard'
import Products_List_Admin from '../pages/(admin)/Products/List/Products_List'
import Product_Details from '../pages/(client)/Products/Details'

const Routing = () => {
    return (
        <>
            <Routes>
                {/* Client */}
                <Route path='/' element={<LayoutClient />}>
                    <Route index element={<Homepage />} />
                    
                    {/* Route products */}
                    <Route path='/products' element={<List_Products />} />
                    <Route path='/product/details/:id' element={<Product_Details />} />
                                       
                    
                    <Route path='/' element={<p className='container mx-auto'>About</p>} />
                    <Route path='/' element={<p className='container mx-auto'>Contact</p>} />
                </Route>

                {/* Admin */}
                <Route path='/admin' element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />
                    <Route path='/admin/products' element={<Products_List_Admin />} />

                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Routing