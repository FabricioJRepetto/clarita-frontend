import { api } from '@/services/api'
import useSWR from 'swr'

const useCabins = () => {
    const { data, error, isLoading, mutate } = useSWR(`/cabin/all`, api)

    const compare = (a, b) => { 
        if (a.identifier < b.identifier) {
            return -1;
        } else if (a.identifier > b.identifier) {
            return 1;
        }
        return 0;
    }

    return {
        cabins: data?.sort(compare),
        error,
        isLoading,
        setCabins: mutate
    }
}

export default useCabins