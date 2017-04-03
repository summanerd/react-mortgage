import React from 'react';

export {InputLabel, InputLabelStacked}

function InputLabel(props) {
    const {classNames = ''} = props;
    
    return (
        <div className={`input-field ${classNames}`} data-field={props.name}>
            <label className="input-field__label">
                {props.label}
                {props.children}
            </label>
            <span className="input-field__hint--inline">{props.inlineHint}</span>
            <div className="clear--both" />
        </div>
    )
    
}

function InputLabelStacked(props) {

    return (
        <InputLabel {...props} classNames="input-field--stacked" />
    );
}