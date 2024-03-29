import { Router } from 'express'
const router = Router()
 import { getFakerProducts } from '../controllers/fakerProductsController'
 import { getLoginController, postLoginController } from '../controllers/sessionControllers'

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


//FAKER Endpoint
router.get("/products-test", getFakerProducts)//Trae todos los productos generados con Faker.

export default router