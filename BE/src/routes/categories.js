import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";
const routeCategories = express.Router();

routeCategories.get('/', getCategories);  //! GET ALL  
routeCategories.post('/', createCategory);  //! CREATE ONE   

export default routeCategories;