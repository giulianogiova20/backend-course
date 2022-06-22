let products =[]

const getForm = (req,res) => {
    res.render('form') 
}

const getProducts = (req, res) => {
    res.render('products', {products})
}


const postProducts = (req, res) => {
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
    products.push(newProduct);
    res.redirect('/products')
};


module.exports = { getProducts, postProducts, getForm}

