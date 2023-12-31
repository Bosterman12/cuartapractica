

import { findAll, findOne, createOne, updateOne , deleteOne} from "../services/users.services.js";
import { userModel } from "../models/Users.js";
import { transporter } from "../utils/nodemailer.js"
export const findAllUsers = async (req,res) => {
    try{
        const users = await findAll()
        //console.log(users)
        if(users) {
           // res.status(200).json({message: "users found", users})
           res.render('admin', {
            users : users
           })

        }else{
            res.status(200).json({message: "no users"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

export const findOneUser = async (req,res) => {

    const {id} = req.params
   
    try{
        const user = await findOne(id)
        if(user) {
            res.status(200).json({message: "user found", user:id})

        }else{
            res.status(400).json({message: "no user"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

export const createOneUser = async (req, res) => {
    const { first_name, last_name, email, gender, password, role } = req.body
    if (!first_name || !last_name || !email || !gender || !password) {
      return res.status(400).json({ message: 'Data missing' })
    }
    try {
      const newUser = await createOne(req.body)
      //res.status(200).json({ message: 'User create', user: newUser })
      res.redirect('../session/login')
    } catch (error) {
      res.status(500).json({ error })
    }
  }

 

export const updateOneUser = async (req,res) => {
   
    const {uid} = req.params
    console.log(uid)
    
    try{
        const user = await userModel.findById(uid)
        console.log(user)
    if(user.role != 'admin'){
        user.role = user.role === 'user' ? 'premium' : 'user'

      await user.save()
      //res.status(200).json({ message: 'User updated', user: user })
      res.render('roleChange', {
        user: user
      })
    }else{
        
            
        res.status(200).json({ message: 'Usuario no actualizado' })
            
        
        
        
        
    }
    
      
    } catch(error) {
        res.status(500).json({ error })
    } 
    } 

    export const deleteOneUser = async (req,res) => {

        const {id} = req.params
        console.log(id)
        const user = await userModel.findById(id)

        try{
            
            if(user.role != 'admin') {
                //res.status(200).json({message: "usuario eliminado", user:id})
           if (user.role = 'premium'){
                await transporter.sendMail({
                    to: user.email,
                    subject: `Cuenta eliminada`,
                    text: ` Estimado ${user.first_name} le informamos que debido a su inactividad 
                    el administrador ha eliminado su cuenta`
                    
                  })
            }
            const userDeleted = await deleteOne(id)
            res.redirect('/user/')
            }else{
                res.status(400).json({message: "los usuarios admin no pueden ser eliminados"})
            }
        }catch(error) {
            res.status(500).json({error})
        }
    }

    export const deleteInactiveUsers = async (req,res) => {

        const users = await findAll()
        const today = Date.now()
        const deletionDate = new Date (today -(1*24*60*60*1000))
       // console.log(deletionDate)
       try{
        for (const connections of users){
            if(deletionDate > connections.last_connection){
                console.log(connections.last_connection)
              if (users.role = 'premium'){
                await transporter.sendMail({
                    to: users.email,
                    subject: `Cuenta eliminada`,
                    text: ` Estimado ${users.first_name} le informamos que debido a su inactividad 
                    el administrador ha eliminado su cuenta`
                    
                  })
            }
             await deleteOne(users)
            res.redirect('/user/')
            }
       }
        
            
        }catch(error) {
            res.status(500).json({error})
        }
        
        

      
    }

    export const checkInactiveUsers = async (req,res) => {

        const users = await findAll()
        const today = Date.now()
        const deletionDate = new Date (today -(1*24*60*60*1000))
        console.log(deletionDate)
        for (const connections of users){
            if(deletionDate > connections.last_connection){
                console.log(users)
            }
            
        }
        
        

      
    }