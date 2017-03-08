import React from 'react';

export default function Select(props) {
    
    return (
        <select value={props.value} onChange={props.onChange}>

            {props.options.map((option, index)=> {
                return (
                    <option key={index} value={option.value}>{option.label}</option>
                );
            })}
            
        </select>
    )
}