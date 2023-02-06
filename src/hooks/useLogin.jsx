import { autoLogin, login } from "@/services/api"
import { getCookie } from "@/utils/cookies"
import useSWR from 'swr'
const TOKEN = getCookie('userToken')

const useLogin = (userData) => {

    const { data, error, isLoading, mutate } = useSWR((TOKEN || userData) ? '/user/login' : null, TOKEN ? autoLogin : () => login(userData))

    return {
        user: data,
        isLoading,
        error,
        mutate
    }
}

export default useLogin