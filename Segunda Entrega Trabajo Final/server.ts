import express from 'express'
import routes from './api/routes/routes'
import auth from './api/middlewares/auth'
import dotenv from 'dotenv'
import wrongRoute from './api/middlewares/wrongRoute'

dotenv.config()
const port = process.env.PORT
const app = express()

app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(auth)
app.use('/api', routes)
app.use(wrongRoute)


app.listen(port, () => { 
    console.log(`Server listening on port: ${port}`)
})
