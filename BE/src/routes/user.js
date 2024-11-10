import express from "express";
import { login, register } from "../controllers/userController.js";
const routeUser = express.Router();

routeUser.post('/login', login);  //! LOGIN
routeUser.post('/register', register);  //! REGISTER 


export default routeUser;