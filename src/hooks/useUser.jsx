import useSWR from 'swr'

const useUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/user/login')
    // const { data, error, isLoading } = useSWR(userData ? '/user/login' : null, () => login(userData))

    return {
        user: data,
        isLoading,
        error,
        setUser: mutate
    }
}

export default useUser
