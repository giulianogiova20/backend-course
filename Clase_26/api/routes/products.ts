import { Router } from 'express'
const productsRouter = Router()

import {getAll, getById, addProduct, updateProduct, deleteProduct} from '../controllers/products'
import { getFakerProducts } from '../controllers/fakerProductsController'


productsRouter.get("/products", getAll) 
productsRouter.get("/products/:id", getById)
productsRouter.post("/products", addProduct)
productsRouter.put("/products/:id", updateProduct)
productsRouter.delete("/products/:id", deleteProduct)

//FAKER Endpoint
productsRouter.get("/products-test", getFakerProducts)//Trae todos los productos generados con Faker.

export default productsRouter