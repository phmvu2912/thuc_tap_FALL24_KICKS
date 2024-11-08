import routeAuth from "./auth.js";
import routeCategories from "./categories.js";
import routeProducts from "./products.js";

const router = (app) => {
    app.use('/api/v1/products', routeProducts); //! Route Products   
    app.use('/api/v1/categories', routeCategories); //! Route Categories   
    app.use('/api/v1/auth', routeAuth); //! Route Auth   
}

export default router