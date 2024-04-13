import React, { useState } from 'react';
import MainMenu from './MainMenu';

function Usher() {

    const [currentPage, setCurrentPage] = useState('');

    const handleClick = () => {
        setCurrentPage('main');
    };

    if (currentPage === 'main') {
        return <MainMenu />;
    }

    return (
        <>
            <div>Usher</div>
        </>
    );
}

export default Usher;