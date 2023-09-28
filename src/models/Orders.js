import {Schema, model} from "mongoose";
import paginate from "mongoose-paginate-v2";

const ordersSchema = new Schema({
 

code: { type: String, unique: true, require: true },
pucharse_datetime: { type: Date, default: Date.now },
amount: { type: Number, require: true },
purchaser: { type: String, require: true }
})

export const orderModel = model('orders', ordersSchema)