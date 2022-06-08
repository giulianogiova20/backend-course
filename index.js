const express = require('express')
const app = express()
const port = 8080
const fs = require("fs")


class Container {
    constructor(fileName){
        this.fileName = fileName
    }


async getAll() {
    try {
        let data = await fs.promises.readFile("./products.txt", "utf-8")
        if (data.length!==0) {
            let products = await JSON.parse(data)
            return products
        } else {
        console.log('No hay productos.')
        }
    } catch (error) {
        console.log(`Ocurrió un error: ${error}`)
    }
}

async getRandom() {
	try {
		let data = await fs.promises.readFile("./products.txt", "utf-8")
        if(data){
		    data = JSON.parse(data)
		    const productRamdom = data[Math.floor(Math.random() * data.length)]
		    return productRamdom
        }else{
            return (console.log('No hay productos.'))
        }
	}catch(err){
        return (console.log(`Hay un error: ${err}`))
    }
}
}

const products = new Container("products.txt")

const allProducts = async (req, res) => {
    const response = await products.getAll()
    res.send(response)
}

const randomProduct = async (req, res) => {
    const response = await products.getRandom()
    res.send(response)
}

app.get('/products', allProducts)
app.get('/random', randomProduct)

app.listen (port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})
