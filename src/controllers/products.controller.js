import { findAllProducts, findOneProductByid, createOneProduct, updateOneProduct,deleteOneProduct } from "../services/products.services.js";
import { generateErrorAddProduct, generateErrorAddProductToCart } from "../errors/info.js";
import EErrors from "../errors/enum.js";
import CustomError from "../errors/customError.js";
export const findAllProd = async (req,res) => {
    try{
        const products = await findAllProducts()
            
           res.render('home', {
                //products: products.docs,
                products : products,
                user: req.session.user
                
                
               
    
                })
          // res.status(200).json({message: "products found", products})
          // res.send(products)
           
           //console.log(products)
          
           
        
        
        
            
    }catch(error) {
        res.status(500).json({error})
    }
}

export const findOneprod = async (req,res) => {

    const {id} = req.params
    
    try{
        const product = await findOneProductByid(id)
        console.log(product)
        if(product) {
            //res.status(200).json({message: "product found", product:id})
            res.render('product', {
                id: product.id,
                title: product.title,
                description : product.description,
                price: product.price,
                stock: product.stock,
                tumbnail: product.tumbnail,
                user: req.session.user
               
                //product : product,
    
                })
        }else{
            res.status(400).json({message: "no product"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

export const createOneProd = async (req, res) => {
    const { title, description, code, category, price, stock, status, owner, tumbnail } = req.body
   

    if (!title || !description || !code || !category  || !price|| !stock|| !status || !owner|| !tumbnail) {
      //return res.status(400).json({ message: 'Data missing' })
      CustomError.createError({
        name: 'Product creation error',
        cause: generateErrorAddProduct({
          title,
          description,
          price,
          category,
          code,
          stock,
        }),
        message: 'Error creating product',
       code: EErrors.INVALID_TYPES_ERROR,
      })
    }
    try {
      const newProduct = await createOneProduct(req.body)
      res.status(200).json({ message: 'Product created', product: newProduct })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  export const updateOneProd = async (req,res) => {
    const id = req.params.id
    const {title, description, code, category, price, stock, status, owner, tumbnail} = req.body
    try {
        if(req.user.role === 'premium' && req.user.id !== owner){
            res.status(401).json({message: 'Ud no puede modificar este producto'})
        }else{
            const updateProd = await updateOneProduct({_id:id},{title, description, code, category, price, stock, status, owner,tumbnail})
        res.status(200).json({ message: 'Product updated', product: updateProd })
        }
        
        
    } catch(error) {
        res.status(500).json({ error })
    }
}

 export const deleteProd = async (req,res) => {
    const id = req.params.id
    const {owner} = req.body
    console.log(owner)
    try{
        if(req.user.role === 'premium' || req.user.id !== owner){
            res.status(401).json({message: 'Ud no puede eliminar este producto'})
        }else{
            const deleteOneProd = await deleteOneProduct({_id: id})
            res.status(200).json({ message: 'Product deleted' })
        }
        
        
    
    }catch(error){
        res.status(500).json({ error })
    }
    
}
