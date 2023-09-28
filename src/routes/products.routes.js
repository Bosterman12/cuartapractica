import { Router } from "express";
import { ProductManager } from "../filesystem/productmanager.js";
import { productModel } from "../models/Products.js";
//import { userModel } from "../models/Users.js";
import { findAllProd, findOneprod, createOneProd,updateOneProd,deleteProd } from "../controllers/products.controller.js";
import applyPolicy from "../middleware/role.middleware.js";

const productRouter = Router()



productRouter.get('/',findAllProd)
productRouter.get('/:id', findOneprod)
productRouter.post('/', applyPolicy(['admin', 'premium']), createOneProd)
productRouter.put('/:id',applyPolicy(['admin', 'premium']) ,updateOneProd)
productRouter.delete('/:id',applyPolicy(['admin','premium']) ,deleteProd)

export default productRouter