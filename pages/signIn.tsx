import { useState } from 'react'
import {
  Heading,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,      
  FormErrorMessage,
  Flex,
  Alert,
  AlertIcon,
  AlertDescription,  
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useAuth, { TCredential } from 'hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { useRouter } from 'next/router'

const scheme = Yup.object({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required'),
})

const SignIn = (): JSX.Element => {
  const router = useRouter()
  const { signIn } = useAuth();
  const [ isSubmitting, setSubmitting ] = useState<boolean>(false)
  const { register, handleSubmit, setError, formState: { errors } } = useForm<TCredential>({
    'mode': 'onBlur',
    resolver: yupResolver(scheme)
  })

  const onSubmit = async({ email, password }: TCredential) => {
    try {
      setSubmitting(true)
      await signIn({ email, password })
      router.replace('/')
    } catch (error) {
      setSubmitting(false)
      setError('email', { type: 'server', message: error.message})
    }
  }  

  return (
    <Container maxW="450px">     
        <Heading textAlign="center" mt={6} as="h1" mb={6}>
          Sign In
        </Heading>   
        {
          Boolean(errors.email) && errors.email?.type === 'server' && (
            <Alert mb={3} status="error">
              <AlertIcon />          
              <AlertDescription>{errors.email?.message}</AlertDescription>              
            </Alert>
          )
        }
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.email) && errors.email?.type !== 'server'} mb={3}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input 
            id="email"
            name="email" 
            placeholder="Email"  
            {...register('email')}
          />       
          <FormErrorMessage as='span'>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)} mb={3}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input 
            id="password"
            type="password" 
            name="password" 
            placeholder="Password" 
            {...register('password')}
          />       
          <FormErrorMessage as='span'>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Flex flexWrap="wrap" mt={6}>
          <Button isLoading={isSubmitting} width="100%" type="submit" colorScheme="teal" size="md" mb={3}>
            Sign In
          </Button>
          <Button width="100%" onClick={() => router.push('/signUp')} type="button" colorScheme="red" size="md">
            Sign Up
          </Button>
        </Flex>
      </form>
    </Container>
  )
}

export default SignIn