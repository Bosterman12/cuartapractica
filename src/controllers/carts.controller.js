import { findAllCarts, findOneCartByid, createOneCart, updateOneCart, deleteOneCart } from "../services/carts.services.js";
import { generateErrorAddProduct, generateErrorAddProductToCart } from "../errors/info.js";
import EErrors from "../errors/enum.js";
import CustomError from "../errors/customError.js";
import { findAllProducts, findOneProductByid, updateOneProduct } from "../services/products.services.js";
import {updateOne} from "../services/users.services.js"
import { json } from "express";
import { deleteProduct } from "../middleware/deleteProductsCart.middleware.js";

export const findCarts = async (req,res) => {
    try{
        const carts = await findAllCarts()
        if(carts) {
            
            res.status(200).json({message: "carts found", carts})
           
           
        }else{
            res.status(200).json({message: "no carts"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}



 export const findOneCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await findOneCartByid({ _id: cid });

    if (!cart) {
      return res.status(400).json({ message: "No cart" });
    }

    const user = req.session.user;
    const products = cart.products;

    // Un array para almacenar los datos de todos los productos
    const productDataArray = [];

    for (var i = 0; i < products.length; i++) {
      var objeto = products[i];
      const id_prod = objeto.id_prod;
      const cant = objeto.cant
      const productData = await findOneProductByid({ _id: id_prod });
      const userCart = cart._id
      //console.log(userCart)
      // Almacena los datos de cada producto en el array
      productDataArray.push({productData, cant, userCart});
      //console.log(productDataArray)
  
      
      
      
    }
    
    
    //console.log(productDataArray);

    res.render('cart', {
      first_name: user.first_name,
      email: user.email,
      role: user.role,
      cart: user.cart,

      //products: products,
      //cant: productDataArray.cant,
      productDataArray: productDataArray, // Pasa el array de datos de los productos
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};


export const createCart = async (req, res) => {
   try{
    const cart = await createOneCart({})
    console.log(cart)
    //res.status(200).send(cart)
    req.session.user = {
      id : req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      gender: req.user.gender,
      email: req.user.email,
      role: req.user.role,
      //cartcreate: req.user.cart,
      cart : req.user.cart,
      last_connection : new Date()
      
    }
    const {id} = req.session.user
    const cartCreated = cart.id
    console.log(cartCreated)
   const updateUser = await updateOne ({_id : id}, {cart : cartCreated})
   console.log(updateUser)
   const user = req.session.user


   res.render('cartCreated', {
   
    email: user.email,
    role: user.role,
    cart: cartCreated,
    
   })
  // res.redirect('/api/product')
    //res.send("carrito creado")
   }catch(error) {
    res.status(500).send('error')
   }
    
  }

 

            export const updateCart = async (req, res, next) => {
              try {
                const cid = req.params.cid;
                const pid = req.params.pid;
                const { quantity } = req.body;
                const user = req.session.user
                console.log(user.id)
            
                const cart = await findOneCartByid({ _id: cid });
                const product = await findOneProductByid({ _id: pid });
                //console.log(product)
                const productOwner = product.owner.toString()
                console.log(productOwner)
            
                if (!cart || !product) {
                  return res.status(404).json({ message: 'Cart or product not found' });
                }
            
                if (quantity > product.stock) {
                  return res.status(500).json({ message: 'Product out of stock' });
                }
                
                if(user.role === 'premium' && user.id === productOwner) {
                 // res.status(401).json({message: 'Ud no puede comprar su propio producto'})
                 res.render('premiumStop', {
                  
                  email: user.email,
                  role: user.role,
                 
                 })
                }
                else{
                  const productIndex = cart.products.findIndex((prod) => prod.id_prod == pid);
            
                if (productIndex === -1) {
                  const addProductCart = {
                    id_prod: pid,
                    cant: quantity,
                  };
            
                  cart.products.push(addProductCart);
                  await updateOneCart({ _id: cid }, { products: cart.products });
            
                  const newStock = product.stock - quantity;
                  await updateOneProduct({ _id: pid }, { stock: newStock });
                  const user = req.session.user
  
  
               res.render('productAdded', {
                id : user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                gender: user.gender,
                email: user.email,
                role: user.role,
                cart: user.cart,
                last_connection : new Date()
               })
              
            
               //   return res.status(200).json({ message: 'Product added to cart' });
                } else {
                  const user = req.session.user
  
  
               res.render('productExist', {
                id : user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                gender: user.gender,
                email: user.email,
                role: user.role,
                cart: user.cart,
                last_connection : new Date()
               })
                //  return res.status(400).json({ message: 'Product already in the cart' });
                }
                }
                
                
              } catch (error) {
                return res.status(500).json({ error: error.message });
              }
            };
            


 export const deleteCart= async (req,res) => {
    
  
    const cid = req.params.cid.toString()
    const  pid= req.params.pid.toString()
   
     
    console.log(cid)
    const cart = await findOneCartByid({_id: cid })
    const product = await findOneProductByid({_id: pid})
    //console.log(product)
    try{

        const productfind = cart.products
        const productToDelete  = productfind.find((prod) => prod.id_prod == pid)
        const productIndex = productfind.findIndex((prod) => prod.id_prod == pid)
       // console.log(productToDelete)
        //console.log(productIndex)
        const stockIncrease = productToDelete.cant
       // console.log(stockIncrease)
        const newStock =  product.stock += stockIncrease
       // console.log(newStock)
      
        await updateOneProduct ({_id: pid}, {stock : newStock})
        productfind.splice(productIndex, 1)

        await updateOneCart({_id : cid}, {products: productfind})
       // console.log(cart)
        const user = req.session.user
        res.render('productDeleted', {
          
          email: user.email,
          role: user.role,
          cart: user.cart,
          
         })
       // const deleteOneProd = await deleteOneCart({_id: id})
       // res.status(200).json({ message: 'Product removed from cart' })
    
    }catch(error){
        res.status(500).json({ error })
    }
    
}

export const updateQuantCart = async (req,res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const {quantity} = req.body
  const cart = await findOneCartByid({_id: cid})
  const product = await findOneProductByid({_id: pid})

  
      try { 
        const productsList = cart.products
        const productUpdate = productsList.findIndex((prod) => prod.id_prod == pid)
        const oldQuantity = productsList[productUpdate].cant
        console.log(oldQuantity)
        productsList[productUpdate].cant = quantity

        const newStock = product.stock - (quantity - oldQuantity)
             //console.log(newStock)
             // product.stock.push(newStock)
        await updateOneProduct ({_id: pid}, {stock : newStock})
        await updateOneCart ({_id : cid}, {products : productsList})
        //res.status(200).send('Cantidad actualizada')
        const user = req.session.user
        res.render('productUpdated', {
          
          email: user.email,
          role: user.role,
          cart: user.cart,
          producto : productUpdate.id_prod,
          cantidad : productUpdate.cant
          
         })
        
      } catch (err) {
        res.status(500).send('No se pudo actualizar la cantidad')
        console.log(err)
      }
      
    
}   

export const emptyCart = async (req, res) => {
  const cid = req.params.cid;

  try {
    const cart = await findOneCartByid({ _id: cid });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Vaciar el carrito
    cart.products = [];
    await updateOneCart({ _id: cid }, { products: cart.products });

    //res.status(200).json({ message: 'Cart emptied successfully' });
    res.redirect('/api/product')
  } catch (error) {
    res.status(500).json({ error: 'Failed to empty the cart' });
  }
};

