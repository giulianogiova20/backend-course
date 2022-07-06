import { Router } from 'express'
const router = Router()

import {getAll, getById, addProduct, updateProduct, deleteProduct} from '../controllers/products'
import {createCart, deleteCart, getProductsByCartId, addToCartById, deleteProductByCartId} from '../controllers/cart'

router.get("/products", getAll) 
router.get("/products/:id", getById)
router.post("/products", addProduct)
router.put("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)

router.post("/cart/", createCart)
router.delete("/cart/:id", deleteCart)
router.get("/cart/:id/products", getProductsByCartId)
router.post("/cart/:id/products", addToCartById)
router.delete("/cart/:id/products/:id_prod", deleteProductByCartId)

export default router