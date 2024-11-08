import express from "express";
import { login, register } from "../controllers/authController.js";
const routeAuth = express.Router();

routeAuth.post('/login', login);  //! LOGIN
routeAuth.post('/register', register);  //! REGISTER 


export default routeAuth;