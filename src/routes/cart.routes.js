import { Router } from "express";
//import { CartManager } from "../CartManager.js";
//import { cartModel } from "../models/Cart.js";
import { findCarts, findOneCart, createCart, updateCart,deleteCart, updateQuantCart, emptyCart } from "../controllers/carts.controller.js";
import applyPolicy from "../middleware/role.middleware.js";
//const cartmanager = new CartManager ('carrito.txt')

const cartRouter = Router()



cartRouter.get('/', applyPolicy (['admin']), findCarts)
cartRouter.get('/:cid', findOneCart)
cartRouter.post('/', createCart)
cartRouter.post('/:cid/product/:pid', updateCart)
cartRouter.delete('/:cid/product/:pid', deleteCart)
cartRouter.put('/:cid/product/:pid', updateQuantCart)
cartRouter.delete('/:cid', emptyCart)


export default cartRouter
