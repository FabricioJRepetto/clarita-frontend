import React from 'react'

const Header = ({ title, sections, section, setSection, admin = false, button = false }) => {

    return (
        <header className={`relative grid grid-cols-6 border-b z-10 ${admin ? 'border-b-orange-500' : 'border-b-gray-400 dark:border-b-slate-700'}`}>
            <h1 className='col-span-6'>{title}</h1>

            {button && button}

            {!!sections.length &&
                sections.map((s, i) => (
                    <button key={s} className={`panel-opt  ${section === i ? `text-slate-900 dark:text-white ${admin ? 'bg-orange-500' : 'bg-gray-400 dark:bg-slate-800'} rounded-t-sm` : `${admin ? 'hover:text-orange-500' : 'hover:text-white'}`}`} onClick={() => setSection(i)}>
                        {s}
                    </button>
                ))
            }

        </header>
    )
}

export default Header