import { createContext } from 'react';
import useFirebaseAuth, { TFirebaseAuth } from 'hooks/useFirebaseAuth'
import { Spinner, Flex } from "@chakra-ui/react"

const AuthContext = createContext<TFirebaseAuth>(null);

type TAuthProviderProps = {
  children: JSX.Element
}

export const AuthProvider = ({ children }: TAuthProviderProps): JSX.Element => {
  const auth = useFirebaseAuth();

  return (
    <AuthContext.Provider value={auth}>
      {auth.loading ? (
        <Flex width="100%" height="100vh" alignItems="center" justifyContent="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
        </Flex>
      ) : children}
    </AuthContext.Provider>
  );
};

export default AuthContext
