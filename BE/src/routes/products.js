import express from "express";
import { createProduct, getProductById, getProducts } from "../controllers/productController.js";

const routeProducts = express.Router();

routeProducts.get('/', getProducts);  //! GET ALL   
routeProducts.get('/:id', getProductById);  //! GET ONE   
routeProducts.post('/', createProduct);  //! CREATE ONE   


export default routeProducts;