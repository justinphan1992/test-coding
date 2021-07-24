import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FB_API,
    authDomain: process.env.NEXT_PUBLIC_FB_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT,
    storageBucket: process.env.NEXT_PUBLIC_FB_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDER,
    appID: process.env.NEXT_PUBLIC_FB_APP,    
  });
} 

export default firebase
