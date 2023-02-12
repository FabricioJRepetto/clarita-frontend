import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { loadData } from '@/utils/formUtils'

const useLoadEditData = (data) => {
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            const editData = data.find(c => c.id === id)
            editData && loadData(editData)
        }
        // eslint-disable-next-line
    }, [])
}

export default useLoadEditData