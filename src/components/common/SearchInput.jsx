import React, { useState } from 'react'
import { generatePath, useLocation, useParams } from 'react-router-dom'
const SearchInput = ({ filter }) => {
    const KEYS = [
        // { name: 'Nombre', val: 'name' },
        { name: 'DNI', val: 'dni' },
        { name: 'Email', val: 'email' },
        { name: 'Nacionalidad', val: 'nationality' },
        { name: 'Procedencia', val: 'provenance' },
        { name: 'Dirección', val: 'address' },
        { name: 'Patente', val: 'plate' },
        { name: 'Tipo de vehículo', val: 'vehicleType' },
    ]

    const { pathname: path } = useLocation()
    // const fullPath = `${window.origin}${path}`
    const { query, key: paramKey } = useParams()
    const [key, setKey] = useState('name')

    const setParams = (key, query) => {
        //: TODO: actualizar params para mantener los valores de busqueda del input
        //: TODO: detectar los params y cargarlos en el input
        const newPath = `${path}?key=${key || 'name'}${query ? '&query=' + query : ''}`
        console.log(newPath)
    }

    return (
        <div>
            <input type="text" placeholder='Buscar' onChange={(e) => filter(key, e.target.value)} />
            <section>
                <button onClick={() => setParams('', 'lang')} className='btn-primary'>TEST</button>
                <label htmlFor='filterSelect'>Buscar por:
                    <select id='filterSelect' onChange={(e) => setKey(e.target.value)}>
                        <option value='name'>Nombre</option>
                        {KEYS.map(k => (
                            <option key={k.name} value={k.val}>{k.name}</option>
                        ))}
                    </select>
                </label>
            </section>
        </div>
    )
}

export default SearchInput