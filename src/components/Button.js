import React from 'react'

const Button = ({ buttonName, event }) => {
    return (
        <div>
            <button onClick={event} className='text-white bg-gradient-to-r from-[#586B73] via-[#AABFB9] to-[#586B73] hover:bg-gradient-to-br  hover:scale-105 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'> {buttonName}</button>
        </div>
    )
}

export default Button
