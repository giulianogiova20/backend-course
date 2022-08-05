const fetchProductosMock = async () => {
    try {
        const productsFaker = await fetch('/api/products-test')
        console.log(productsFaker)
        return productsFaker.json()
    } catch (error) {
        console.log(`Han error has ocurred: ${error}`)
    }
}

const renderProducts = async (products) => {
    try {
        const template = await fetch('./faker.hbs')
        const hbsTemplateCompiled = Handlebars.compile(await template.text())
    
        document.getElementById('products').innerHTML = hbsTemplateCompiled({products})
    } 
    catch (error) {
        console.log(`Han error has ocurred: ${error}`)
    }
}


fetchProductosMock()
    .then(products => {
        renderProducts(products)
    })