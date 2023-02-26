import { api } from '@/services/api'
import useSWR from 'swr'

const useLedger = () => {
    const { data, error, isLoading, mutate } = useSWR(`/ledger/all`, api)

    return {
        all: data,
        error,
        isLoading,
        mutate
    }
}

export default useLedger