import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyExample-replace-with-real-key",
  authDomain: "phdconnect-89ee5.firebaseapp.com",
  projectId: "phdconnect-89ee5",
  storageBucket: "phdconnect-89ee5.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:000000000000000000000000"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
