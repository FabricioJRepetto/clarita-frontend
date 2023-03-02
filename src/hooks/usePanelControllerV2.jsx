import { setNIGHTS } from '@/utils/formUtils'
import { useEffect, useState } from 'react'

const usePanelController = (create, creating) => {

    const [selectMode, setSelectMode] = useState(false)
    const [cabin, setCabin] = useState(false)
    const [start, setStart] = useState(false)
    const [end, setEnd] = useState(false)
    const [length, setLength] = useState(3.5)

    const [creatingMode, setCreatingMode] = useState(false)
    useEffect(() => {
        if (!creating) {
            setCreatingMode(() => false)
            reset()
        }
    }, [creating])


    const reset = () => {
        setSelectMode(() => false)
        setCabin(() => false)
        setStart(() => false)
        setEnd(() => false)
        setLength(() => 3.5)
    }

    const cDown = (cabin, date) => {
        setSelectMode(() => true)
        setCabin(() => cabin)
        setStart(() => date)
    }

    const cUp = () => {
        if (selectMode && end) {
            if (start.getTime() === end.getTime()) {
                reset()
                return
            }

            const aux = {
                cabin,
                checkin: start,
                checkout: end,
                nights: setNIGHTS(start, end)
            }
            setCreatingMode(() => true)
            create(() => aux)
        } else reset()
    }

    const mEnter = (date) => {
        if (selectMode) {
            // si se selecciona hacia atras, se desactiva el modo
            if (date < start) reset()
            setEnd(() => date)
            setLength(() => {
                let aux = ((date.getTime() - start.getTime()) / 1000 / 60 / 60 / 24 * 7)
                return aux < 3.5 ? 3.5 : aux
            })
        }
    }

    const frontier = () => {
        // checkea si el mouse sale de la fila
        selectMode && reset()
    }

    return {
        selectMode,
        creatingMode,
        end,
        length,

        reset,
        cDown,
        cUp,
        mEnter,
        frontier
    }
}

export default usePanelController