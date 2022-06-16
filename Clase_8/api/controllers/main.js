let products =[]

const addProduct = (req, res) => {
    let objectId = 0;
    const { title, price, thumbnail } = req.body;
    if(!products.length) {
        objectId = 1;
    } else {
        let lastIndex = products.length - 1;
        let newId = products[lastIndex].id + 1;
        objectId = newId; 
    };

    let newProduct = {
        id: objectId,
        title,
        price: Number(price),
        thumbnail
    };
    JSON.stringify(newProduct, null, 2)
    products.push(newProduct);
    res.status(201).json(products)
};

const deleteProduct = (req, res, next) => {
    const id = req.params.id

    if (isNaN(Number(id))) {
        res.status(400).json({ error: "ID must be a number" })
        return next(error, req, res)
    } else {
            const productsWithoutID = products.filter(product => {
                return product.id !== Number(id)
            })
            if (productsWithoutID.length === products.length) {
                res.status(404).json({ error: "NOT FOUND" })
            } else {
                products = productsWithoutID
                res.status(200).json(products)
            }
        }
    }

const getAll = (req, res) => {
    if(products.length > 0) {
        res.status(200).json(products);
    } else {
        res.status(200).send("<h1>NO PRODUCTS - Add a new product in /form</h1>");
    }
}

const getById = (req, res, next) => {
    const id = req.params.id;

    if (isNaN(Number(id))) {
        /* const error = new Error("ID must be a number")
        res.status(400) */
        res.status(400).json({ error: "ID must be a number" })
        return next(error, req, res)
    } else {
        const productByID = products.filter((product) => {
            return product.id === Number(id)
        })

        if (!productByID.length) {
            res.status(404).json({ error: "NOT FOUND" })
        } else {
            productByID.forEach((product) => {
                console.log(
                    `${product}`
                )
            })
            res.json(productByID)
        }
    }
}

const updateProduct = (req, res, next) => {
    const id = req.params.id

    if (isNaN(Number(id))) {
        res.status(400).json({ error: "ID must be a number" })
        return next(error, req, res)
        
    } else {
        const { title, price, thumbnail } = req.body
        const productSelected = products.filter((item) => {
            return item.id === Number(id)
        })
        if (!productSelected.length) {
            return res.status(404).json({ error: "NOT FOUND" })
        } else {
            let findProduct = products.findIndex((item) => {
                return item.id == Number(id)
            })
            products[findProduct].title = title
            products[findProduct].price = Number(price)
            products[findProduct].thumbnail = thumbnail
            console.log('Products updated:')
            console.log(products[findProduct])
            return res.status(200).json(products)
        }
    }
}


module.exports = { addProduct, deleteProduct, getAll, getById, updateProduct}

