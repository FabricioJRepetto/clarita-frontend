import React from 'react'

const PageController = ({ page, changePage, elements, EPP }) => {
    return (
        <section className='mt-6 flex justify-center items-center'>
            <button disabled={page === 1}
                className='btn-tertiary'
                onClick={() => changePage('-')}>anterior</button>

            <p className='-mb-1 text-xl'>{page} / {Math.ceil(elements / EPP)}</p>

            <button disabled={page >= Math.ceil(elements / EPP)}
                className='btn-tertiary'
                onClick={changePage}>siguiente</button>
        </section>
    )
}

export default PageController