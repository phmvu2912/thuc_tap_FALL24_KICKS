import express from "express";
import { addItemToCart, getCartByUserId, removeItemFromCart } from "../controllers/cartController.js";
const routeCart = express.Router();

routeCart.get("/:userId", getCartByUserId);  //! GET CART BY USER ID
routeCart.post("/add-to-cart", addItemToCart);  //! THÊM SẢN PHẨM VÀO GIỎ HÀNG   
routeCart.post("/remove-item", removeItemFromCart);  //! DELETE ONE   

export default routeCart;