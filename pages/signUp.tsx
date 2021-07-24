import {
  Heading,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  FormErrorMessage,
  Alert,
  AlertIcon,  
  Flex,
  AlertDescription,
} from '@chakra-ui/react';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import useAuth, { TCredential } from 'hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'


type TSignUpForm = TCredential & {
  password_confirm: string
}

const scheme = Yup.object({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required').min(3, 'Password at least 3 characters'),
  password_confirm: Yup.string().required('Password confirm is required').oneOf([Yup.ref('password')], 'Password does not match'),
})

const SignUp = (): JSX.Element => {
  const router = useRouter()
  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<TSignUpForm>({
    'mode': 'onBlur',
    resolver: yupResolver(scheme)
  })

  const { signUp } = useAuth();

  const onSubmit = async({ email, password }: TCredential) => {
    try {
      await signUp({ email, password })
      reset()
    } catch (error) {
      setError('email', { type: 'server', message: error.message})
    }
  }  

  const onError = (errors) => console.log(errors);

  return (
    <Container maxW="450px">     
        <Heading textAlign="center" mt={6} as="h1" mb={6}>
          Sign Up
        </Heading>    
        {isSubmitSuccessful && (
          <Alert status="success" variant="subtle" mt={3} mb={3}>
            <AlertIcon />
            <AlertDescription>Account has been created successfully!</AlertDescription>          
          </Alert>
        )}  
        {
          Boolean(errors.email) && errors.email?.type === 'server' && (
            <Alert mb={3} status="error">
              <AlertIcon />          
              <AlertDescription>{errors.email?.message}</AlertDescription>              
            </Alert>
          )
        }
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
          <FormControl isInvalid={Boolean(errors.password_confirm)} mb={6}>
            <FormLabel htmlFor="password-confirm">Password Confirm</FormLabel>
            <Input 
              id="password-confirm"
              type="password" 
              name="password-confirm" 
              placeholder="Password Confirm" 
              {...register('password_confirm')}
            />       
            <FormErrorMessage as='span'>{errors.password_confirm?.message}</FormErrorMessage>
          </FormControl>
          <Flex flexWrap="wrap" mt={6}>
            <Button isLoading={isSubmitting} width="100%" type="submit" colorScheme="teal" size="md" mb={3}>
              Sign Up
            </Button>
            <Button width="100%" onClick={() => router.push('/signIn')} type="button" colorScheme="red" size="md">
              Sign In
            </Button>
          </Flex>         
        </form>
    </Container>
  )
}

export default SignUp