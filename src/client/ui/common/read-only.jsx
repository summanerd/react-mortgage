import React from 'react';

export {ReadOnly, ReadOnlyStacked}

function ReadOnly(props) {
    const {classNames = ''} = props;
    
    return (
        <div className={`read-only-field ${classNames}`} data-field={props.name}>
            <label className="read-only-field__label">
                {props.label} 
                <span className="read-only-field__value">{props.value}</span>
            </label>
        </div>
    )
    
}

function ReadOnlyStacked(props) {

    return (
        <ReadOnly {...props} classNames="read-only-field--stacked" />
    );
}