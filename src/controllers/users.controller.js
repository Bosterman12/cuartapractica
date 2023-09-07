/*export const createUser = (req, res) => {
    res.send({ status : 'success', message: 'Usuario creado'})
}*/

import { findAll, findOne, createOne, updateOne } from "../services/users.services.js";

export const findAllUsers = async (req,res) => {
    try{
        const users = await findAll()
        if(users) {
            res.status(200).json({message: "users found", users})

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
    if (!first_name || !last_name || !email || !gender || !password || !role) {
      return res.status(400).json({ message: 'Data missing' })
    }
    try {
      const newUser = await createOne(req.body)
      res.status(200).json({ message: 'User create', user: newUser })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  export const updateOneUser = async (req,res) => {
   
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
    const {first_name, last_name, gender, email, role, cart, last_connection} = req.session.user
    try {
       
        
            const updateUser = await updateOne({_id:id},{first_name, last_name, gender, email, role, cart, last_connection})
        res.status(200).json({ message: 'User updated', user: updateUser })
        
        
        
    } catch(error) {
        res.status(500).json({ error })
    }
}