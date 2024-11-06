import express from "express";
import { createProduct, getProductById, getProducts, removeProduct } from "../controllers/productController.js";

const routeProducts = express.Router();

routeProducts.get('/', getProducts);  //! GET ALL   
routeProducts.get('/:id', getProductById);  //! GET ONE   
routeProducts.post('/', createProduct);  //! CREATE ONE   
routeProducts.delete('/:id', removeProduct);  //! REMOVE ONE   


export default routeProducts;