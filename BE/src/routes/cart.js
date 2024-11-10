import express from "express";
import { addItemToCart, getCartByUserId } from "../controllers/cartController.js";
const routeCart = express.Router();

routeCart.get("/:userId", getCartByUserId);  //! GET CART BY USER ID
routeCart.post("/add-to-cart", addItemToCart);  //! THÊM SẢN PHẨM VÀO GIỎ HÀNG   
// routeCart.put("/update", updateProductQuantity);  //! UPDATE QUANTITY ITEM  
// routeCart.delete("/remove", removeFromCart);  //! DELETE ONE   

export default routeCart;