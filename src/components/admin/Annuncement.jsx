import useUser from '@/hooks/useUser'
import { postApi } from '@/services/api'
import React from 'react'
import { useState } from 'react'
import AnnounCard from '../common/cards/AnnounCard'

const Annuncement = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [style, setStyle] = useState('default')
    const { user: { user_name: from } } = useUser()

    const handler = async (e) => {
        e.preventDefault()
        const data = { title, text, style }
        //: TODO: mostrar mensajes de error o exito
        //: TODO: Notification system
        try {
            const res = await postApi(['/user/admin/announcement', data])
            console.log(res)
        } catch (err) {
            console.warn(err?.message);
        }
    }

    // info, warn, danger, fix

    return (
        <div className='grid gap-4'>
            <section>
                <h2>Anuncio</h2>
                <p>Crear anuncio que se meustra en la home</p>
            </section>

            <section>
                <p className='text-gray-500'>Vista previa</p>
                <AnnounCard data={{ title, text, style, from }} />
            </section>

            <form onSubmit={handler} autoComplete='off' className='grid grid-cols-4 gap-2 w-96 p-2'>

                <label htmlFor="title" className='col-span-4'>
                    <p>Titulo</p>
                    <input type="text" required id='title' name='title' className='w-full'
                        onChange={e => setTitle(e.target.value)} />
                    {/* <div className='h-6 text-sm text-rose-500'>{errors?.title || ''}</div> */}
                </label>

                <label htmlFor="text" className='col-span-4'>
                    <p>Mensaje</p>
                    <textarea type="text" required id='text' name='text' className='w-full resize-none' cols="30" rows="3" onChange={e => setText(e.target.value)} />
                    {/* <div className='h-6 text-sm text-rose-500'>{errors?.text || ''}</div> */}
                </label>

                <label htmlFor="text" className='col-span-4'>
                    <p>Estilo</p>
                    <select name="style-select" id="style-select" defaultValue="default" onChange={e => setStyle(e.target.value)}>
                        <option value="default">Simple</option>
                        <option value="info">Información</option>
                        <option value="warn">Atención</option>
                        <option value="danger">Advertencia</option>
                    </select>
                </label>

                <button type='submit' className='btn-primary col-span-4'>{'Guardar'}</button>

            </form>
        </div>
    )
}

export default Annuncement