import { useRef } from 'react';
import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Input } from "@chakra-ui/react"
import useAuthValidation from 'hooks/useAuthValidation';

const Home = (): JSX.Element => {
  useAuthValidation()  
  const dynamicTextRef = useRef(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    if (dynamicTextRef.current) {
      dynamicTextRef.current.changeValue(e.target.value)
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DynamicText ref={dynamicTextRef} />
        <Input onChange={onChange} />        
      </main>
    </div>
  );
};

export default Home;
