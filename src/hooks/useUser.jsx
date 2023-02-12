import useSWR from 'swr'

const useUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/user/login')
    // const { data, error, isLoading } = useSWR(userData ? '/user/login' : null, () => login(userData))

    return {
        user: data,
        isLoading,
        error,
        setUser: mutate,
        role: data?.role || undefined,
        admin: data?.role === 'admin' || data?.role === 'master',
        master: data?.role === 'master'

    }
}

export default useUser
