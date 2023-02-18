import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { loadData } from '@/utils/formUtils'

const useLoadEditData = (data, edit_id) => {
    const { id } = useParams(),
        ID = edit_id || id

    useEffect(() => {
        if (ID) {
            const editData = data.find(c => c.id === ID)
            editData && loadData(editData)
        }
        // eslint-disable-next-line
    }, [])
}

export default useLoadEditData