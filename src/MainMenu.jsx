import Cashier from './Cashier';
import Buffet from './Buffet';
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
    if (currentPage === 'logout') {
        return <LoginPage />;
    }

    return (
        <>
            <Navigation>
                <DropdownButton title={currentPage}>
                    <Button id='buffet' className='btn btn-outline-primary m-1 p-2 fs-5' onClick={() => setCurrentPage('buffet')}>Buffet</Button>
                    <Button id='cashier' className='btn btn-outline-primary m-1 p-2 fs-5' onClick={() => setCurrentPage('cashier')}>Cashier</Button>
                    <Button id='logout' className='btn btn-outline-danger m-1 p-2 fs-5' onClick={() => setCurrentPage('logout')}>Logout</Button>
                </DropdownButton>
                {/*<div className='d-flex justify-content-center align-items-center text-white fs-5 me-3'>
                    {employee.username}
                </div>*/}
            </Navigation>
        </>
    );
}

export default MainMenu