import { api } from '@/services/api'
import useSWR from 'swr'

const useClients = () => {
    const { data, error, isLoading, mutate } = useSWR(`/client/all`, api)

    return {
        clients: data?.clientList || [],
        isLoading,
        error,
        setClient: mutate
    }
}

export default useClients