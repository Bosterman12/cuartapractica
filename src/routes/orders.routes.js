import { Router } from "express";
import { findOneorder, findAllOrder, createOrder, updateOrder, deleteOrder } from "../controllers/orders.controller.js";
import { orderModel } from "../models/Orders.js";
import appyPolicy from '../middleware/role.middleware.js'

const orderRouter = Router()

/*rderRouter.post('/', async (req,res) => {
    const { order_number, cart, user, products, price } = req.body
    
     await orderModel.create({order_number, cart, user, products, price })
  
    res.send("Producto creado")
})*/

orderRouter.get('/',findAllOrder)
orderRouter.get('/:id', findOneorder)
orderRouter.post('/:cid/purchase',appyPolicy(['user' , 'premium']), createOrder)
orderRouter.put('/:id', updateOrder)
orderRouter.delete('/:id', deleteOrder)

export default orderRouter