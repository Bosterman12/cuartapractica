import mongoose from "mongoose";
import config from "../config/config.js";
import { productModel } from "../models/Products.js";
import { userModel } from "../models/Users.js";

before (async () => {
    await mongoose.connect(config.URL_MONGODB_ATLAS)
})

after ( async () =>{
    mongoose.connection.close()
})

export const dropProducts = async () => {
    await productModel.collection.dropb()
}

export const dropUsers = async () => {
    await userModel.collection.drop ()
}