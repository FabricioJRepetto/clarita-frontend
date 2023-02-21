import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MdFilterAlt } from 'react-icons/md';
import Switch from './Switch';

const SearchInput = ({ filter }) => {
    const KEYS = [
        { name: 'Nombre', val: 'name' },
        { name: 'DNI', val: 'dni' },
        { name: 'Email', val: 'email' },
        { name: 'Teléfono', val: 'telephone' },
        { name: 'Profesión', val: 'profession' },
        { name: 'Nacionalidad', val: 'nationality' },
        { name: 'Procedencia', val: 'provenance' },
        { name: 'Dirección', val: 'address' },
        { name: 'Patente', val: 'plate' },
        { name: 'Tipo de vehículo', val: 'vehicleType' },
    ]

    const [searchParams, setSearchParams] = useSearchParams({})
    const pQuery = searchParams.get('query')
    const pKey = searchParams.get('key')
    const [querys, setQuerys] = useState({ query: '', key: 'name' })
    const [expanded, setExpanded] = useState(false)
    const switchIcon = <MdFilterAlt className={`scale-150 ${expanded ? 'text-blue-400' : 'text-gray-500'}`} />

    const setParams = ({ query, key }) => {
        let aux = {
            key: 'name'
        }
        query && (aux.query = query)
        key && (aux.key = key)

        setSearchParams(aux);
    }

    useEffect(() => {
        let aux = {
            key: 'name',
            query: ''
        }
        pKey && (aux.key = pKey)
        pQuery && (aux.query = pQuery)
        // update inputs with URL params
        setQuerys(() => aux)
        // if there is a query param, trigger a search
        pQuery && filter(pKey, pQuery)

        // eslint-disable-next-line
    }, [])


    const handler = (key, query) => {
        // set the search values on URL params
        setParams({ key, query })
        // set the search values on state
        setQuerys(() => ({ key, query }))
        // trigger the search
        filter(key, query)
    }

    const toggleExpand = () => {
        setExpanded(curr => {
            if (curr) {
                // when deactivating filters, trigger a search with default filter
                // use pQuery to avoid errors
                handler('name', pQuery)
                return false
            } else return true
        })
    }

    return (
        <div className='my-2 py-2'>
            <section className='flex flex-row items-center'>
                <input type="text" placeholder='Buscar' value={querys.query} onChange={(e) => handler(querys.key, e.target.value)} />
                <Switch options={[switchIcon]} cb={toggleExpand} />
            </section>

            <section className={`p-4 ${expanded ? 'flex' : 'hidden'}`}>
                <p className='mx-2 text-gray-500 text-sm'>Buscar por</p>
                <select id='keySelect' value={querys.key} onChange={(e) => handler(e.target.value, querys.query)}>
                    {KEYS.map(k => (
                        <option key={k.name} value={k.val}>{k.name}</option>
                    ))}
                </select>
            </section>
        </div>
    )
}

export default SearchInput