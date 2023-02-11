import { textSort } from '@/utils/sorter'
import React, { useMemo, useState } from 'react'
import ClientMiniCard from '../common/cards/ClientMiniCard'
import PageController from '../common/PageController'

const ClientList = ({ data }) => {
    const EPP = 5 // Elements Per Page
    const [page, setPage] = useState(1)
    const sorted = useMemo(() => data.sort(textSort), [data])
    const pageContent = useMemo(() => sorted.slice(EPP * (page - 1), EPP * page), [sorted, page])

    const changePage = (arg) => {
        arg ? setPage(page => page - 1)
            : setPage(page => page + 1)
    }

    return (
        <div className='h-3/4'>
            {!!pageContent?.length &&
                <section>
                    {pageContent.map(e => (
                        <ClientMiniCard data={e} key={e.id} />
                    ))}
                </section>}

            <PageController page={page} changePage={changePage} elements={data.length} EPP={EPP} />
        </div>
    )
}

export default ClientList