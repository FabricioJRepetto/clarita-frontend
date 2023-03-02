import React from 'react'
import useCabins from '@/hooks/useCabins'
import usePanelController from '@/hooks/usePanelController'
import usePanelControllerV2 from '@/hooks/usePanelControllerV2'
import { correctDate, dayName } from '@/utils/formatDate'
import ReservCard from './panelComponents/ReservCard'
import Tile from './panelComponents/Tile'
import TileV2 from './panelComponents/TileV2'

const ReservationsPanel = ({ create, creating, blueprint: { dates, template } }) => {
    const { cabins } = useCabins()

    const { selectMode, creatingMode, cDown, cUp, mEnter, frontier, length } = usePanelControllerV2(create, creating)

    return (
        <section className='flex w-full overflow-x-auto'>
            <div className='tc'>
                <div className='rounded-tl-xl border-t border-slate-700'>
                    <p>Cabañas</p>
                </div>
                {Object.entries(template).map(c => (
                    <div key={c[0]} className='ellipsis'>
                        <p>{cabins.find(cab => cab.id === c[0])?.name}</p>
                    </div>
                ))}
            </div>

            <div className={creatingMode ? 'pointer-events-none' : ''}>
                <div className='tr bg-neutral-200 dark:bg-slate-900 border-t border-slate-700'>
                    {dates.map(d => (
                        <div key={d} className={`bg-neutral-200 dark:bg-slate-800/30 flex-col px-4 ${d.getDate() === 1 ? 'bg-blue-500/20' : ''}`}>
                            <p className='capitalize'>{dayName(d)}</p>
                            <p className='dark:text-gray-400'>{correctDate(d)}</p>
                        </div>
                    ))}
                </div>

                {Object.entries(template).map(c => (
                    <div key={c[0]} id={c[0]} className='tr select-none'
                        onMouseEnter={frontier}>

                        {c[1].map((tile, i) => (
                            <div key={c[0] + tile.date} className={`${tile.date.getDate() === 1 ? 'bg-blue-500/10' : ''}`}
                                onMouseDown={() => cDown(c[0], tile.date)}
                                onMouseUp={() => cUp()}>

                                {tile?.reserv?.checkin && <ReservCard data={tile.reserv} />}

                                {/* <Tile mode={selectMode} creating={creatingMode} disabled={tile?.reserv && !tile?.reserv?.checkin} cb={() => mEnter(tile.date)} /> */}
                                {/* <Tile mode={selectMode} creating={creatingMode} disabled={tile?.reserv} cb={() => mEnter(tile.date)} /> */}

                                <TileV2 mode={selectMode} creating={creatingMode} disabled={tile?.reserv && !tile?.reserv?.checkin} cb={() => mEnter(tile.date)} length={length} />
                                <TileV2 mode={selectMode} creating={creatingMode} disabled={tile?.reserv} cb={() => mEnter(tile.date)} length={length} />

                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </section>
    )
}

export default ReservationsPanel