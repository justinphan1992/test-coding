import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FB_API,
    authDomain: process.env.NEXT_PUBLIC_FB_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT,
    storageBucket: process.env.NEXT_PUBLIC_FB_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDER,
    appID: process.env.NEXT_PUBLIC_FB_APP,
    databaseURL: `https://${process.env.NEXT_PUBLIC_FB_PROJECT}.asia-southeast1.firebaseio.com`
  });
} 

export default firebase
