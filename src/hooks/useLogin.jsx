import { autoLogin } from "@/services/api"
import { getCookie } from "@/utils/cookies"
import useSWR from 'swr'

const useLogin = () => {
    const { data, error, isLoading, mutate } = useSWR(['/user/login', getCookie('userToken')], autoLogin)

    return {
        user: data,
        isLoading,
        error,
        reLog: mutate
    }
}

export default useLogin