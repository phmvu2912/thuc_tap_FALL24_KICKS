import routeCategories from "./categories.js";
import routeProducts from "./products.js";

const router = (app) => {
    app.use('/api/v1/products', routeProducts); //! Route Products   
    app.use('/api/v1/categories', routeCategories); //! Route Categories   
}

export default router