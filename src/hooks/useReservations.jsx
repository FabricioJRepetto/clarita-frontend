import { api } from '@/services/api'
import useSWR from 'swr'

const useReservations = () => {
    const { data, error, isLoading, mutate } = useSWR(`/reservation/all`, api)

    return {
        reservations: data?.reservationList || [],
        isLoading,
        error,
        setReserations: mutate
    }
}

export default useReservations