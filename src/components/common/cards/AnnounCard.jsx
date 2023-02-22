import React, { useState } from 'react'
import { MdInfoOutline, MdWarningAmber, MdOutlineDangerous, MdOutlineBuildCircle, MdOutlineCircleNotifications } from 'react-icons/md';

const AnnounCard = ({ data }) => {
    const {
        title,
        text,
        style,
        from
    } = data

    const icon = {
        info: <MdInfoOutline className='text-xl' />,
        warn: <MdWarningAmber className='text-xl' />,
        danger: <MdOutlineDangerous className='text-xl' />,
        fix: <MdOutlineBuildCircle className='text-xl' />,
        default: <MdOutlineCircleNotifications className='text-xl' />,
    }

    const [expanded, setExpanded] = useState(false)

    return (
        <div onClick={() => setExpanded(() => !expanded)}
            className={`announcement ${style ? style : 'default'} h-fit`}>

            <p className='txt-n-icon min-w-max max-w-max mb-auto'>
                {icon[style || 'default']}
                <b>{title ? title + ': ' : ''}</b>
            </p>
            <div className={`${expanded ? '' : 'ellipsis'}`} >{text}</div>
            {from && <i className='absolute bottom-1 right-2 text-sm opacity-60 capitalize'>{from}</i>}
        </div >
    )
}

export default AnnounCard