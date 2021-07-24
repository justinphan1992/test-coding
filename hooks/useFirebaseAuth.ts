import { useState, useEffect } from 'react'
import firebase from 'services/firebase'

export  type TUser = firebase.User | null

export type TCredential = {
  email: string,
  password: string,
}

export type TFirebaseAuth = {
  user: TUser,
  loading: boolean,
  signUp: (credential: TCredential) => Promise<boolean>,
  signIn: (credential: TCredential) => Promise<boolean>,
  signOut: () => Promise<void>,
}

const useFirebaseAuth = (): TFirebaseAuth => {
  const [ user, setUser] = useState<TUser>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const authStateChanged = async (user: TUser): Promise<void> => {  
    setUser(user)
    setLoading(false);
  };

  const signUp = ({email, password}: TCredential) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return true;
      })
     
  };

  const signIn = ({email, password}: TCredential) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        setUser(result.user);
        return true;
      })            
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    user,
    signIn,
    signOut,
    signUp,
    loading
  };
}

export default useFirebaseAuth