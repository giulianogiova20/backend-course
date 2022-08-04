export interface NewMessage {
    author: {
      email: string
      name: string
      lastname: string
      age: number
      alias: string
      avatar: string
    }
    message: string
  }