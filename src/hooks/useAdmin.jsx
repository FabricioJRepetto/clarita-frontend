import useSWR from 'swr'
import { api } from '@/services/api'

const useAdmin = () => {
    const { data, error, isLoading, mutate } = useSWR('/user/admin/all', api)
    console.log(data);
    return {
        users: data?.usersList || [],
        isLoading,
        error,
        setUsers: mutate
    }
}

export default useAdmin
