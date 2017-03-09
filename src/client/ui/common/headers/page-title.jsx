import React from 'react';

export default function SectionTitle(props) {
    return (
        <header className="page-title">
            <h2>{props.title}</h2>
        </header>
    );
}