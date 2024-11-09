import express from "express";
import { createCategory, getCategories, getCategoryById, removeCategory, updateCategory } from "../controllers/categoryController.js";
const routeCategories = express.Router();

routeCategories.get('/', getCategories);  //! GET ALL  
routeCategories.get('/:id', getCategoryById);  //! GET ONE   
routeCategories.post('/', createCategory);  //! CREATE ONE   
routeCategories.put('/:id', updateCategory);  //! UPDATE ONE   
routeCategories.delete('/:id', removeCategory);  //! DELETE ONE   


export default routeCategories;