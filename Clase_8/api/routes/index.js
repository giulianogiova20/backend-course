const { Router } = require('express')
const router = Router()

const { getAll } = require('../controllers/main')
const { getById } = require('../controllers/main')
const { addProduct } = require('../controllers/main')
const { updateProduct } = require('../controllers/main')
const { deleteProduct } = require('../controllers/main')

router.get("/products", getAll) 
router.get("/products/:id", getById)
router.post("/products", addProduct)
router.put("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)

module.exports = router