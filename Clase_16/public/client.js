const socket = io()

const productsList = document.querySelector('#products')
const addProduct = document.querySelector('#addProduct')
const productTitleInput = document.querySelector('#productTitle')
const productPriceInput = document.querySelector('#productPrice')
const productThumbnailInput = document.querySelector('#productThumbnail')

const formMessage = document.querySelector('#formMessage')
const userEmailInput = document.querySelector('#userEmailInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')


const sendMessage = (e) => {
    try {
        const email = userEmailInput.value
        const message = messageInput.value
        socket.emit('client:message', { email, message })
    } catch (error) {
        console.log(`Han error has ocurred: ${error}`)
    }
}

const renderMessages = async (messages) => {
    try {
        const template = await fetch('chat.hbs')
        const hbsTemplateCompiled = Handlebars.compile(await template.text())
    
        messagesPool.innerHTML = hbsTemplateCompiled({
          messages,
        })} 
    catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

const sendProduct = () => {
    try {
        const title = productTitleInput.value
        const price = Number(productPriceInput.value)
        const thumbnail = productThumbnailInput.value
        socket.emit('client:product', { title, price, thumbnail })
    } catch (error) {
        console.log(`Han error has ocurred: ${error}`)
    }
}

const renderProducts = async (products) => {
    try {
        const template = await fetch('product.hbs')
        const hbsTemplateCompiled = Handlebars.compile(await template.text())
    
        productsList.innerHTML = hbsTemplateCompiled({
          products,
        })
      } 
      catch (error) {
        console.log(`Han error has ocurred: ${error}`)
      }
}

/* CLIENT EVENTS */

addProduct.addEventListener('submit', event => {
    event.preventDefault()
    sendProduct()
    productTitleInput.value = ""
    productPriceInput.value = ""
    productThumbnailInput.value = ""
})

formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = "" 
})

/* SERVER EVENTS */

socket.on('server:products', products => {renderProducts(products)})

socket.on('server:message', renderMessages)