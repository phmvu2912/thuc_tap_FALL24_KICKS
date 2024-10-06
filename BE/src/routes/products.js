import express from "express";
import { getProducts } from "../controllers/productController.js";

const routeProducts = express.Router();

routeProducts.get('/', getProducts);  //! GET ALL   

export default routeProducts;