import { autoLogin } from "@/services/api"
import useSWR from 'swr'

const useAutoLogin = () => {
    const { data, error, isLoading } = useSWR('/user/login', autoLogin)

    return {
        aUser: data,
        aLoading: isLoading,
        aError: error
    }
}

export default useAutoLogin