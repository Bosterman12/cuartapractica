import session from "express-session"
import {addLogger} from "../utils/logger.js"
import { findOne, updateOne } from "../services/users.services.js"




export const testLogin =  async (req, res, next) => {
    
   
   try{
        if(!req.user){
           return res.status(401).send({status: "error", error: "usuario invalido"})
          // res.render('errorLogin')
        }
        req.session.user = {
            id : req.user.id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            gender: req.user.gender,
            email: req.user.email,
            role: req.user.role,
            cart: req.user.cart,
            last_connection : new Date()
            
          }
          const {id, last_connection} = req.session.user
         const updateConnection = await updateOne ({_id : id}, {last_connection : last_connection})
         console.log(updateConnection)

          
          
            /*req.session.user = {
                email : req.user.email,
                first_name: req.user.first_name
            }*/

            //res.status(200).send({status: "sucess", payload: req.user})
            //console.log(req.session.user)
           
           res.redirect('../api/product')
            
                
            

           
   }catch(error) {
       res.status(500).send({status: "error", error: error.message})
    
        
        
   }
   
   
   
    
}

export const destroySession = async (req, res, next) => {
    
        try{
            req.session.destroy()
            res.render('sessions/login')
       /*req.session.destroy(() =>{
            res.status(200).json({message: "Session destruida"})
            //res.redirect('../session/login')*/
        }catch(error) {
            res.status(500).send('error de logout')

        }
    }


export const getSession = (req, res, next) => {
    if(req.session.login){
  
            res.status(200).json({message: "Session activa"})
        
    }else{
        res.status(401).json({message: "Session no activa"})
    }
}