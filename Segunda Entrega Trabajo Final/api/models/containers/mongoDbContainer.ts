import mongoose from 'mongoose'
import config from '../../db/config'

class MongoDBContainer {
  model: mongoose.Model<any, {}, {}, {}>

  constructor(model: mongoose.Model<any, {}, {}, {}>) {
    this.model = model
    this.connect()
  }

  private async connect() {
    try {
      await mongoose.connect(config.mongoDB.URI)
      console.log('connected to mongoDB Atlas')
    } catch (err) {
      console.log(err)
    }
  }

}

export default MongoDBContainer