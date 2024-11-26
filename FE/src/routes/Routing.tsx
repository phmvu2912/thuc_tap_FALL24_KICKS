import { Route, Routes } from 'react-router-dom'
import LayoutClient from '../pages/layouts/LayoutClient'
import Homepage from '../pages/(client)/Homepage/Homepage'
import NotFound from '../pages/NotFound/NotFound'
import List_Products from '../pages/(client)/Products/List'
import LayoutAdmin from '../pages/layouts/LayoutAdmin'
import Dashboard from '../pages/(admin)/Dashboard/Dashboard'
import Products_List_Admin from '../pages/(admin)/Products/List/Products_List'
import Product_Details from '../pages/(client)/Products/Details'
import Search from '../pages/(client)/Search/Search'
import Product_Form from '../pages/(admin)/Products/Form/Product_Form'
import Categories_List from '../pages/(admin)/Categories/List/Categories_List'
import Cart from '../pages/(client)/Cart/Cart'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Category_Form from '../pages/(admin)/Categories/Form/Category_Form'
import List_Users from '../pages/(admin)/Users/List/List_Users'
import Form_User from '../pages/(admin)/Users/Form/Form_User'
import Profile from '../pages/(client)/Profile/Profile'

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

                    {/* Search */}
                    <Route path='/search' element={<Search />} />

                    {/* Cart */}
                    <Route path='/cart' element={<Cart />} />

                    {/* Profile */}
                    <Route path='/profile' element={<Profile />} >
                        <Route index element={<h1>Index</h1>} />
                        <Route path='/profile/update' element={<h1>Update</h1>} />
                    </Route>

                </Route>

                {/* Admin */}
                <Route path='/admin' element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />

                    {/* route products */}
                    <Route path='/admin/products' element={<Products_List_Admin />} />
                    <Route path='/admin/product/create' element={<Product_Form />} />
                    <Route path='/admin/product/update/:id' element={<Product_Form />} />

                    {/* route categories */}
                    <Route path='/admin/categories' element={<Categories_List />} />
                    <Route path='/admin/category/create' element={<Category_Form />} />
                    <Route path='/admin/category/update/:id' element={<Category_Form />} />

                    {/* route users */}
                    <Route path='/admin/users' element={<List_Users />} />
                    <Route path='/admin/user/update/:id' element={<Form_User />} />
                </Route>

                {/* Route Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Routing