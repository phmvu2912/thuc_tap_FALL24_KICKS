import express from "express";
import { getUsers, login, register } from "../controllers/userController.js";
const routeUser = express.Router();

// auth
routeUser.post('/login', login);  //! LOGIN
routeUser.post('/register', register);  //! REGISTER 

routeUser.get('/users', getUsers);  //! GET ALL USERS

export default routeUser;