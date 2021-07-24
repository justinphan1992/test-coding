
import { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from 'context/AuthContext'
import "../styles/globals.css";


const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
