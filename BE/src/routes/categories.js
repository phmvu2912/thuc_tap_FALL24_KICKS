import express from "express";
import { getCategories } from "../controllers/categoryController.js";
const routeCategories = express.Router();

routeCategories.get('/', getCategories);  //! GET ALL   

export default routeCategories;