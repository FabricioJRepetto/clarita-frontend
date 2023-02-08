import { api } from '@/services/api'
import useSWR from 'swr'

const useCabins = () => {
    const { data, error, isLoading, mutate } = useSWR(`/cabin/all`, api)

    return {
        cabins: data,
        error,
        isLoading,
        setCabin: mutate
    }
}

export default useCabins