import { login } from "@/services/api"
import useSWR from 'swr'

const useUser = (userData) => {
    const { data, error, isLoading } = useSWR(userData ? '/user/login' : null, () => login(userData))

    return {
        user: data,
        isLoading,
        isError: error
    }
}

export default useUser
