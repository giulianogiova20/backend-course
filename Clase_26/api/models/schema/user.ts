import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface User {
  username: string;
  password: string;
  email: string;
  comparePassword(reqPassword: string, password: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
}, { collection: "users" })


userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt)
      user.password = hash
      next()
  } catch (err: any) {
      next(err)
  }
})


userSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

userSchema.methods.comparePassword = async (reqPassword: string, password: string): Promise<boolean> => {
  return await bcrypt.compareSync(reqPassword, password)
}

export default mongoose.model<User>('User', userSchema)