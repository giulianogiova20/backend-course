import dotenv from 'dotenv'

dotenv.config()
const USR = process.env.MONGOUSR
const PWD = process.env.MONGOPWD
const CLUSTER = process.env.MONGOCLUSTER

export default {
    mongoDB: {
      URI: `mongodb+srv://${USR}:${PWD}@${CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    }
  }