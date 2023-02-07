import { autoLogin, login } from "@/services/api"
import { getCookie } from "@/utils/cookies"
import useSWR from 'swr'
const TOKEN = getCookie('userToken')

const useLogin = (userData) => {
    const shouldFetch = TOKEN || userData
    const fetcher = TOKEN ? autoLogin : () => login(userData)

    const { data, error, isLoading, mutate } = useSWR(shouldFetch ? '/user/login' : null, fetcher)

    return {
        user: data,
        isLoading,
        error,
        mutate
    }
}

export default useLogin