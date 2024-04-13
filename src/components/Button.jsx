import React from 'react'

const Button = ({ className, onClick, children, value }) => {
    return (
        <button
            className={className}
            onClick={onClick}
            value={value}
        >
            {children}
        </button>
    )
}

export default Button;