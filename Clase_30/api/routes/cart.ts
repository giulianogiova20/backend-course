import { Router } from 'express'
const cartRouter = Router()

import {createCart, deleteCart, getProductsByCartId, addToCartById, deleteProductByCartId} from '../controllers/cart'

cartRouter.post("/cart/", createCart)
cartRouter.delete("/cart/:id", deleteCart)
cartRouter.get("/cart/:id/products", getProductsByCartId)
cartRouter.post("/cart/:id/products", addToCartById)
cartRouter.delete("/cart/:id/products/:id_prod", deleteProductByCartId)

export default cartRouter