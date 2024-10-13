import express from "express";
import { getProductById, getProducts } from "../controllers/productController.js";

const routeProducts = express.Router();

routeProducts.get('/', getProducts);  //! GET ALL   
routeProducts.get('/:id', getProductById);  //! GET ONE   

export default routeProducts;