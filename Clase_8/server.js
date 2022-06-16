const express = require('express')
const app = express()
const rutas = require('./api/routes/index')
const puerto = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/form', express.static(`${__dirname}/public`))


app.use('/', rutas)


app.use((error, req, res) => {
    res.status(error.httpStatusCode).send(error)
})

app.listen(puerto, (err) => {
    if(err) {
        console.log(`Error starting the server ${err}`)
    } else {
        console.log(`Server listening in port: ${puerto}`)
    }
})