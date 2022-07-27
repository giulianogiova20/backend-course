import mongoose from 'mongoose'


const CartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: Object, ref: 'products' },
    },
  ],
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  timestamp: {
    type: Number,
    required: true,
    default: Date.now,
  },
})

export default mongoose.model('carts', CartSchema)