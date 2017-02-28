import React from 'react';

export default function ReadOnly(props) {
    
    return (
        <div className="read-only-field" data-field={props.name}>
            <label className="read-only-field__label">
                {props.label} 
                <span className="read-only-field__value">{props.value}</span>
            </label>
        </div>
    )
    
}