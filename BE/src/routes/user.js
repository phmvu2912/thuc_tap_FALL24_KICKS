import express from "express";
import { getUserById, getUsers, login, register, updateUser } from "../controllers/userController.js";
const routeUser = express.Router();

// auth
routeUser.post('/login', login);  //! LOGIN
routeUser.post('/register', register);  //! REGISTER 

routeUser.get('/users', getUsers);  //! GET ALL USERS
routeUser.get('/users/:id', getUserById);  //! GET AN USER REQ.BODY
routeUser.put('/users/:id', updateUser);  //! UPDATE AN USER

export default routeUser;