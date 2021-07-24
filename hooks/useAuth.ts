import { useContext } from 'react'
import AuthContext from 'context/AuthContext'
import { TFirebaseAuth } from 'hooks/useFirebaseAuth'

const useAuth = (): TFirebaseAuth => useContext<TFirebaseAuth>(AuthContext);;

export * from 'hooks/useFirebaseAuth'

export default useAuth;