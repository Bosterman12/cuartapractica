
import userManager from "../managers/users.manager.js";
import { createHash } from "../utils/bcrypt.js";


const usersManager = new userManager

export const findAll = async ()=> {
    try{
        const users = await usersManager.findAll()
        return users
    }catch(error) {
        return error
    }
}

export const findOne = async (id)=> {
    try{
        const user = await usersManager.findOneById(id)
     
        return user
    }catch(error) {
        return error
    }
}

export const createOne = async (obj)=> {
    try{
        const hashPassword = await createHash(obj.password)
        const newObj = {...obj, password : hashPassword}
        const newUser = await usersManager.createOne(newObj)
        return newUser
    }catch(error) {
        return error
    }
}

export const updateOne = async (id, obj)=> {
    try{
        const user = await usersManager.updateOne(id, obj)
        return user
    }catch(error) {
        return error
    }
}

export const deleteOne = async (id)=> {
    try{
        const user = await usersManager.deleteOne(id)
        return user
    }catch(error) {
        return error
    }
}