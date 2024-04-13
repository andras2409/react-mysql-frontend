import Cashier from './Cashier';
import Buffet from './Buffet';
import Usher from './Usher';
import Button from './components/Button';
import LoginPage from './LoginPage';
import { useState } from 'react';
import React from 'react';
import Navigation from './components/Navigation';
import DropdownButton from './components/DropdownButton';

/*(function requestFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else if (document.documentElement.webkitRequestFullscreen) { // Support for Safari
        document.documentElement.webkitRequestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    }
})()*/

function MainMenu() {

    const [currentPage, setCurrentPage] = useState('Main Menu');

    if (currentPage === 'buffet') {
        return <Buffet />;
    }
    if (currentPage === 'cashier') {
        return <Cashier />;
    }
    if (currentPage === 'usher') {
        return <Usher />;
    }
    if (currentPage === 'logout') {
        return <LoginPage />;
    }

    return (
        <>
            <Navigation>
                <DropdownButton title={currentPage}>
                    <Button id='buffet' className='mb-1' onClick={() => setCurrentPage('buffet')}>Buffet</Button>
                    <Button id='cashier' className='mb-1' onClick={() => setCurrentPage('cashier')}>Cashier</Button>
                    <Button id='usher' className='mb-1' onClick={() => setCurrentPage('usher')}>Usher</Button>
                    <Button id='logout' className='logout-btn' onClick={() => setCurrentPage('logout')}>Logout</Button>
                </DropdownButton>
            </Navigation>
        </>
    );
}

export default MainMenu