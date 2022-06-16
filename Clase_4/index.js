import fs from 'fs'

class Container {

    constructor(title, price, thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    file = fs.writeFileSync('./products.txt','')


async save(product) {
    try {
        let data = await fs.promises.readFile('./products.txt', 'utf-8')
        if (data.length!==0) {
            let products = await JSON.parse(data)
            let productsId = products.map( product => {return product.id})
            let lastId = Math.max(...productsId)
            let newId = lastId +1
            Object.assign(product, { id: `${newId}`})
            products.push(product)
            await fs.promises.writeFile('./products.txt', JSON.stringify(products))
            console.log(`Se agregó otro producto al array:`)
            console.log(product)
            return newId
        } else {
            Object.assign(product, { id: '1' })
            let products = [product]
            await fs.promises.writeFile('./products.txt', JSON.stringify(products))
            console.log(`Se agregó el primer producto al array:`)
            console.log(product)
            return 1
           
        }
        
    } catch (error) {
        console.log(`Ocurrió un error: ${error}`)
    }
}

async getById(id) {
    try {
        let data = await fs.promises.readFile('./products.txt', 'utf-8')
        if (data.length!==0) {
            let products = await JSON.parse(data)
            let product = products.find(product => product.id === id.toString())
            if (product) {
                console.log(`El producto con el id ${id} es: `)
                console.log(product)
                return product
            } else {
                console.log(`No existe níngun producto con el id: ${id}`)
            }
        } else {
            console.log('No hay productos.')
        }
    } catch (error) {
        console.log(`Ocurrió un error: ${error}`)
    }
}

async getAll() {
    try {
        let data = await fs.promises.readFile('./products.txt', 'utf-8')
        if (data.length!==0) {
            let products = await JSON.parse(data)
            console.log(`Todos los productos existentes son:`)
            console.log(products)
        } else {
        console.log('No hay productos.')
        }
    } catch (error) {
        console.log(`Ocurrió un error: ${error}`)
    }
}

async deleteById(id) {
    try {
        let data = await fs.promises.readFile('./products.txt', 'utf-8')
        if (data.length!==0) {
            let products = await JSON.parse(data)
            let product = products.find(product => product.id === id.toString())
            if (product) {
                let newProducts = products.filter(product => product.id !== id.toString())
                await fs.promises.writeFile('./products.txt', JSON.stringify(newProducts))
                console.log(`Se eliminó el producto con el id: ${id}`)
                console.log(product)
                await this.getAll()
            } else {
                console.log(`No existe ningún producto con el id: ${id}`)
            }
        } else {
            console.log('No hay productos.')
        }
    } catch (error) {
        console.log(`Ocurrió un error: ${error}`)
    }
}

async deleteAll() { 
    try {
        await fs.promises.writeFile('./products.txt', '')
        console.log('Todos los productos fueron eliminados.')
    } catch (error) {
        console.log(`Ocurrió un error: ${error}`)
    }  
}

}

const product01 = new Container("The Mandalorian Figure",14,"https://m.media-amazon.com/images/I/71ylTgu1ysL._AC_SX569_.jpg")
const product02 = new Container("Palpatine Figure",15,"https://m.media-amazon.com/images/I/61XAmUM3l0L._AC_SX569_.jpg")


// TEST SAVE
await product02.save(product02)
await product01.save(product01)
await product02.save(product02)

//TEST GET PRODUCT BY ID
await product01.getById(1)

//TEST GET ALL
await product01.getAll()

//TEST DELETE BY ID
await product01.deleteById(2)

//TEST DELETE ALL
await product01.deleteAll()
