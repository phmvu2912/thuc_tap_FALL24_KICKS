import routeCart from "./cart.js";
import routeCategories from "./categories.js";
import routeProducts from "./products.js";
import routeUser from "./user.js";

const router = (app) => {
    app.use('/api/v1/products', routeProducts); //! Route Products   
    app.use('/api/v1/categories', routeCategories); //! Route Categories   
    app.use('/api/v1/', routeUser); //! Route User 
    app.use('/api/v1/carts', routeCart); //! Route Cart  
}

export default router