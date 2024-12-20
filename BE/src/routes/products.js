import express from "express";
import { createProduct, getProductById, getProducts, removeProduct, updateProduct } from "../controllers/productController.js";

const routeProducts = express.Router();

routeProducts.get('/', getProducts);  //! GET ALL   
routeProducts.get('/:id', getProductById);  //! GET ONE   
routeProducts.post('/', createProduct);  //! CREATE ONE   
routeProducts.put('/:id', updateProduct);  //! CREATE ONE   
routeProducts.delete('/:id', removeProduct);  //! REMOVE ONE   


export default routeProducts;