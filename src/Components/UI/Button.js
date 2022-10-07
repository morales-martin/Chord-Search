import React from 'react'
import './Button.css'

const Button = props => {
    return <button onClick={props.onClick} className={`${props.className} btn-svg`}>
        {props.children}
    </button>
}

export default Button;