import React from 'react';

const Button = (props) => {
    return (
        <button className={`rounded w-[300px] h-[40px] px-[10px] bg-neutral-800 hover:bg-neutral-900 duration-200 text-white uppercase font-bold text-sm ${props.className}`} onClick={ props.onClick }>
            { props.text }
        </button>
    );
}

export default Button;
