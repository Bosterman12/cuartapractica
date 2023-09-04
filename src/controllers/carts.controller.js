import { findAllCarts, findOneCartByid, createOneCart, updateOneCart, deleteOneCart } from "../services/carts.services.js";
import { generateErrorAddProduct, generateErrorAddProductToCart } from "../errors/info.js";
import EErrors from "../errors/enum.js";
import CustomError from "../errors/customError.js";
import { findAllProducts, findOneProductByid, updateOneProduct } from "../services/products.services.js";


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

export const findOneCart = async (req,res) => {

    const id = req.params.cid
    try{
        const cart = await findOneCartByid(id)
        if(cart) {
            res.status(200).json({message: "cart found", cart:id})

        }else{
            res.status(400).json({message: "no cart"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

export const createCart = async (req, res) => {
   try{
    const cart = await createOneCart({})
    console.log(cart)
    res.status(200).send(cart)
    //res.send("carrito creado")
   }catch(error) {
    res.status(500).send('error')
   }
    
  }

  export const updateCart = async (req,res, next) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const {quantity} = req.body
    const cart = await findOneCartByid({_id: cid})
    const product = await findOneProductByid({_id: pid})
    console.log(product)

    if ( quantity > product.stock) {
      /* CustomError.createError({
          name: 'Product creation error',
          cause: generateErrorAddProductToCart({
            product,
          }),
          message: 'Error adding product to cart',
          code: EErrors.INVALID_ARGUMENT,
        })*/
        res.status(500).send('producto sin stock')
        }else{
          try {
        
          
            const addProductCart = {
              id_prod: pid,
              cant: quantity,
            
            }
            console.log(cart)
            console.log(addProductCart)
            if(req.user.role === 'premium' || req.user.id === product.owner) {
              res.status(401).json({message: 'Ud no puede comprar su propio producto'})
            }else{
              cart.products.push(addProductCart)
              await updateOneCart({_id: cid}, cart)
              const newStock = product.stock -= quantity
              console.log(newStock)
             // product.stock.push(newStock)
              await updateOneProduct ({_id: pid}, {stock : newStock})
             res.status(200).send('Producto agregado al carrito')
            }
            
          } catch (err) {
            console.log(err)
          }
        }

    /*if ( !pid || !cid ||!quantity||!owner ) {
                CustomError.createError({
                  name: 'Product creation error',
                  cause: generateErrorAddProductToCart({
                    pid,
                    quantity
                  }),
                  message: 'Error adding product to cart',
                  code: EErrors.INVALID_ARGUMENT,
                })
              }*/
        
        
    
  }

 export const deleteCart= async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const cart = await findOneCartByid({_id: cid})
    const product = await findOneProductByid({_id: pid})
    console.log(product)
    try{

        const productfind = cart.products
        const productToDelete  = productfind.find((prod) => prod.id_prod == pid)
        console.log(productToDelete)
        const stockIncrease = productToDelete.cant
        console.log(stockIncrease)
        const newStock =  product.stock += stockIncrease
        console.log(newStock)
      
        await updateOneProduct ({_id: pid}, {stock : newStock})
        productfind.splice(productToDelete, 1)

        await updateOneCart({_id : cid}, {products: productfind})
        

       // const deleteOneProd = await deleteOneCart({_id: id})
        res.status(200).json({ message: 'Product removed from cart' })
    
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
        
        productsList[productUpdate].cant = quantity

        await updateOneCart ({_id : cid}, {products : productsList})
        res.status(200).send('Cantidad actualizada')
        
        
      } catch (err) {
        res.status(500).send('No se pudo actualizar la cantidad')
        console.log(err)
      }
      
    
}