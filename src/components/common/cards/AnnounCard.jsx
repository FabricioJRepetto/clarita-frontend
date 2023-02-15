import React from 'react'
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

    return (
        <div className={`announcement ${style ? style : 'default'} fade-in justify-between`}>
            <p className='txt-n-icon'>
                {icon[style || 'default']}
                <b>{title ? title + ': ' : ''}</b>
                {text}
            </p>
            <i className='opacity-60 px-4 capitalize'>{from || ''}</i>
        </div>
    )
}

export default AnnounCard