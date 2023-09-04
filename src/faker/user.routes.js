import { Router } from "express";
import { generateUser, generateProducts } from "./user.faker.js";

const router = Router()

router.get('/users', async (req,res) =>{
    const users = []
    try{
        for( let i=0 ; i<100 ; i++){
            users.push(generateUser())
        }
        //console.log(users)
        //res.json({status:'success', payload : users})
        res.status(200).send(users)
    }catch(error){
        res.status(400).send(error)
    }
    
})

router.get('/products', async (req,res) =>{
    const products = []
    try{
        for( let i=0 ; i<100 ; i++){
            products.push(generateProducts())
        }
        //console.log(users)
        //res.json({status:'success', payload : users})
        res.status(200).send(products)
    }catch(error){
        res.status(400).send(error)
    }
    
})

export default router