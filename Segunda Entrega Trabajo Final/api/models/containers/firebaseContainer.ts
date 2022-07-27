import serviceAccountCredentials from '../../db/serviceAccountKey.json'
import admin from 'firebase-admin'

const serviceAccount = serviceAccountCredentials as admin.ServiceAccount

class FirebaseContainer {
  collection: string

  constructor(collection: string) {
    this.collection = collection
    this.connect()
  }

  connect() {
    try {
      if (admin.apps.length === 0) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        })

        console.log('connected to firebase')
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default FirebaseContainer