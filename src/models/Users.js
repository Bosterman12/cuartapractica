import { Schema, SchemaTypes, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import {cartModel} from './Cart.js'
//import mongoose from "mongoose";




const userSchema = new Schema  ({
    
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    gender: {
        type: String,
        required: true,
        default: 0
    },
    password: {
        type: String,
        required: true
    },

   cart : {
        type : SchemaTypes.ObjectId,
        ref: 'carts'
    },

    role: {
        type: String,
        required: true,
        enum: ["admin", "user", "premium"],
        default: 'user'
    },

    documents: [
        {
            name : {
                type: String
            },
            reference : {
                type : String
            }
        }
    ],
    
    last_connection : {
        type: Date,
        default : Date.now
    },

    
})

userSchema.plugin(paginate)

userSchema.pre('save', async function (next) {
    if (!this.isNew) {
      return next()
    }
  
    try {
      const newcart = new cartModel()
  
      await newcart.save()
  
      this.cart = newcart._id
  
      return next()
    } catch (error) {
      return next(error)
    }
  })

export const userModel = model("users", userSchema)

/*const userModel = model("users", userSchema)
export default userModel*/