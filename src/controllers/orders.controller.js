import { findAllOrders, findOneOrderByid, createOneOrder, updateOneOrder, deleteOneOrder } from "../services/orders.services.js"
import { findOneCartByid, deleteCart } from "../services/carts.services.js"
import { v4 as codeGenerator } from "uuid"
import { findOneProductByid } from "../services/products.services.js"
import { id_ID } from "@faker-js/faker"
import { emptyCart } from "./carts.controller.js"
export const findAllOrder = async (req,res) => {
    try{
        const orders = await findAllOrders()
            
           res.status(200).json({message: "orders found", orders})
        
           
           console.log(orders)
          
           
        
        
        
            
    }catch(error) {
        res.status(500).json({error})
    }
}

export const findOneorder = async (req,res) => {

    const {id} = req.params
    try{
        const order = await findOneOrderByid(id)
        if(order) {
            res.status(200).json({message: "order found", order:id})

        }else{
            res.status(400).json({message: "no product"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

/*export const createOrder = async (req, res) => {
    const order = await createOneOrder({} )
    res.send("orden creada")
    
  }*/

 export const createOrder= async (req, res) => {
    
    //const { code, amount, purchaser } = req.body
    const cid = req.params.cid
    const cart = await findOneCartByid({_id: cid})
    let totalAmount = 0
   
        /* const productCart = cart.products
    console.log(productCart)
    const productBase = await findOneProductByid ({id_prod : id})*/
    for (const product of cart.products){
        const quantity = product.cant
        const productId = product.id_prod
        const productData = await findOneProductByid(productId)
        //let totalAmount = 0
        const subTotal = productData.price * quantity
        const total = subTotal
    
            totalAmount += total
        
        
        //console.log(totalAmount)   }
        /*const code = codeGenerator()
        const amount = totalAmount
        console.log(amount)
        const purchaser = req.user.id  
        if (!code || !amount || !purchaser) {
            return res.status(400).json({ message: 'Data missing' })
          }*/
        try{   
       
       
          const newOrder = await createOneOrder({
            code : codeGenerator(),
            amount : totalAmount,
            purchaser : req.user.email
          })
          //res.status(200).json({ message: 'Order created', order: newOrder })
          
         res.render('order',{
            code : newOrder.code,
            purchaser : newOrder.purchaser,
            amount : newOrder.amount,
           
          })

           
    }
    
    
   
      catch (error) {
      //res.status(500).json({ error })
    }
      
 }  }
    
    
    
  

  export const updateOrder = async (req,res) => {
    const id = req.params.id
    const {order_nunber, cart, user, products, price} = req.body
    try {
        const updateOrder = await updateOneOrder({_id:id},{order_nunber, cart, user, products, price})
        res.status(200).json({ message: 'order updated', order: updateOrder })
        
    } catch(error) {
        res.status(500).json({ error })
    }
}

 export const deleteOrder = async (req,res) => {
    const id = req.params.id
    try{
        const deleteOneOrd = await deleteOneOrder({_id: id})
        res.status(200).json({ message: 'Order deleted' })
    
    }catch(error){
        res.status(500).json({ error })
    }
    cart.products.splice(0, cart.products.lenght)
    console.log(cart)
}
