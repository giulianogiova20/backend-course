const socket = io()

const addProduct = document.querySelector('#addProduct')
const productTitleInput = document.querySelector('#productTitle')
const productPriceInput = document.querySelector('#productPrice')
const productThumbnailInput = document.querySelector('#productThumbnail')

const formMessage = document.querySelector('#formMessage')
const userEmailInput = document.querySelector('#userEmailInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

const sendMessage = () => {
    try {
        const userEmail = userEmailInput.value
        const message = messageInput.value

        socket.emit('client:message', { userEmail, message })
    } catch (error) {
        console.log(`Han error has ocurred; ${error}`)
    }
}

const renderMessages = (messages) => {
    try {
        const html = messages.map(messageInfo => {
            return(`<div>
                <p class="userEmail fw-bold">${messageInfo.userEmail} <span class="userMessage text-success">${messageInfo.message}</span></p> 
                </div>`)
        }).join(" ");

        messagesPool.innerHTML = html
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

const showProduct = () => {
    try {
        const title = productTitleInput.value
        const price = Number(productPriceInput.value)
        const thumbnail = productThumbnailInput.value
        socket.emit('client:product', { title, price, thumbnail })
    } catch (error) {
        console.log(`Han error has ocurred; ${error}`)
    }
}

const renderProducts = async (products) => {
    const response = await fetch('/productTemplate.hbs')
    const dataTemplate = await response.text()
    document.querySelector('#products').innerHTML = ""
    products.forEach(product => {
        const templatehbs = Handlebars.compile(dataTemplate)
        const html = templatehbs(product)
        document.querySelector('#products').innerHTML += html
    });
}

/* CLIENT EVENTS */

addProduct.addEventListener('submit', event => {
    event.preventDefault()
    showProduct()
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

socket.on('server:products', products => {
    renderProducts(products)
})

socket.on('server:message', renderMessages);