import { useEffect } from 'react'
import useAuth from 'hooks/useAuth'
import { useRouter } from 'next/router'

const useAuthValidation = (): void => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/signIn')
    }
  }, [user, router])
}

export default useAuthValidation