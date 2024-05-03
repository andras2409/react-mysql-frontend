import Cashier from './Cashier';
import Buffet from './Buffet';
import Button from './components/Button';
import LoginPage from './LoginPage';
import { useState } from 'react';
import React from 'react';
import Navigation from './components/Navigation';
import DropdownButton from './components/DropdownButton';
import Trash from './components/Trash';
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
            <div className='container-fluid bg-dark-subtle p-4'>
                <h1 className='mb-5'>Üdvözöljük!</h1>

                <h4>Segítség a program használatához:</h4>
                <p className='mb-5'>A <button className='btn btn-primary me-2 ms-2'>Main Menu</button> gombra kattintva tudja kiválasztani, 
                hogy a büfés <button className='btn btn-outline-primary me-2 ms-2'>Buffet</button>
                vagy a pénztáros <button className='btn btn-outline-primary me-2 ms-2'>Cashier</button> felületet szeretné használni.</p>

                <h3 className='text-decoration-underline'>A büfés felület használata:</h3>
                <div className='ms-5 w-75'>
                    <h4>Termékek kezelése: </h4>
                    <div className='ms-5'>
                        <p className='mb-2'>A termék gombjára kattintva <button className='btn btn-primary me-2 ms-2'><div>Small Popcorn</div><div>1500</div></button> a termék hozzáadódik a kosárhoz.</p>
                        <div className='d-flex align-items-center pb-2'>
                            <div className='d-flex me-4'>A kosárhoz adott elemek listaelemként jelennek meg: </div>
                            <ul className='list-group col-3'>
                                <li className={'list-group-item d-flex justify-content-between p-1'}>
                                    <div className='d-flex justify-content-center align-items-center'>Small Popcorn</div>
                                    <div className='btn-group col-6'>
                                        <div className='d-flex col-8'>
                                            <button className='btn btn-secondary'>-</button>
                                            <div className='d-flex justify-content-center align-items-center p-3 pt-2 pb-2 col-4'>1</div>
                                            <button className='btn btn-secondary'>+</button>
                                        </div>
                                        <Trash divClass={'d-flex justify-content-center col-4'}/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <p className='mb-2'>A termékek mennyiségét a <button className='btn btn-secondary me-2 ms-2'>-</button> és a <button className='btn btn-secondary me-2 ms-2'>+</button> gombbal lehet módosítani.</p>
                        <div className='d-flex align-items-center mb-2'>
                            <div>A</div>
                            <Trash divClass='me-2 ms-2'/>
                            <div>gombra kattintva törölhetjük az adott terméket.</div>
                        </div>
                        <p>Ha tötölni szeretnénk az összes felütött terméket, a <button className='btn btn-primary me-2 ms-2'>Delete Basket</button> gombbal tehetjük meg.</p>
                    </div>
                    <h4>Kilépés az oldalról:</h4>
                    <p className='ms-5'>A <DropdownButton title={"Buffet"} buttonClass={'me-2 ms-2'}/> lenyíló gombra kattintva és a <button className='btn btn-outline-danger me-2 ms-2'>Back To Main Menu</button>
                    opció kiválasztásával tudunk visszajutni a főmenübe.</p>
                    <h4>Összesítés megtekintése:</h4>
                    <p className='ms-5'>A <DropdownButton title={"Buffet"} buttonClass={'me-2 ms-2'}/> lenyíló gombra kattintva és a <button className='btn btn-outline-primary me-2 ms-2'>Summary</button>
                    tudjuk megtekinteni az eladott termékeket, készpénzes és bankkártyás bevételt, illetve a be- és kifizetéseket.</p>
                </div>
                <h3 className='text-decoration-underline'>A pénztáros felület használata:</h3>
                <div className='ms-5 w-75'>
                    <h4>Jegyeladás: </h4>
                    <p className='ms-5'>A pénztásor felületre belépve, az adott előadás gombjára kattintva tudjuk megnyitni a terem ülésrendjét. 
                    Például: 
                    <button className='btn btn-primary fs-5 col-2 ms-2'>
                        <div className='row'>
                            <div className='col text-truncate fw-bold fs-5'>Dune: Part Two</div>
                        </div>
                        <div className="row justify-content-center fw-semibold fs-6">19:30</div>
                        <div className='row'>
                            <div className='col fs-6 d-flex justify-content-start'>16</div>
                            <div className='col fs-6 d-flex justify-content-end'>185</div>
                        </div>
                    </button>
                    </p>
                    <p className='ms-5'>Ezután a termen belül az oldal alján feltüntetett jegytípusok közül, az adott gombra kattintva tudjuk kiválasztani a kívánt jegytípust.</p>
                    <div className='d-flex ms-5 align-items-center'>
                        <div>Például: </div>
                        <Button className={'ticket-btn btn btn-primary text-truncate ms-2'}>
                            <div className='fs-5'>Adult</div>
                            <div>2600</div>
                        </Button>
                    </div>
                    <p className='ms-5'>A jegytípusok mennyiségénel módosítása, vagy törlése ugyan úgy zajik, mint a büfés felület esetén.</p>
                    <p className='ms-5'>A jegyeladás csak akkor lehetséges, ha a felütött jegyek száma megyegyezik az általunk kiválasztott helyek számával.</p>
                    <h4>Foglalás rögzítése:</h4>
                    <p className='ms-5'>Foglalás csak abban az esetben lehetséges, ha éppen nincsen aktív tranzakció (nicsen felütött termék).</p>
                    <p className='ms-5'>Ebben az esetben nicsen más dolgunk, mint a szabad helyek közül rákattintani azokra, amelyetek le szeretnénk foglalni, majd ezután a
                        <button className='btn btn-primary ms-2 me-2'>Save Reservation</button> gombbal elmentjük azt.
                    </p>
                    <p className='ms-5'>Abban az esetben, ha a foglalás mentése előtt új tranzakciót kezdünk, a kijelölt helyek elvesznek!</p>
                    <h4>Kilépés az oldalról:</h4>
                    <p className='ms-5'>A <DropdownButton title={"Cashier"} buttonClass={'me-2 ms-2'}/> lenyíló gombra kattintva és a <button className='btn btn-outline-danger me-2 ms-2'>Back To Main Menu</button>
                    opció kiválasztásával tudunk visszajutni a főmenübe.</p>
                    <h4>Összesítés megtekintése:</h4>
                    <p className='ms-5'>A <DropdownButton title={"Cashier"} buttonClass={'me-2 ms-2'}/> lenyíló gombra kattintva és a <button className='btn btn-outline-primary me-2 ms-2'>Summary</button>
                    tudjuk megtekinteni az eladott termékeket, készpénzes és bankkártyás bevételt, illetve a be- és kifizetéseket.</p>
                </div>
                <h3 className='text-decoration-underline'>Pénzbefizetés és pénzkivétel: </h3>
                <div className='ms-5 w-75'>
                    <p className=''>Pénzbefizetést és pénzkivétet a <button className='btn btn-primary m-2'>Deposit</button> és a <button className='btn btn-primary m-2'>Withdraw</button> gomb használatával tehetjük meg. 
                    A funkciók használata előtt adjuk meg a kívánt összeget. Abban az esetben, ha tranzakció van folyamatban, a pénzbefizetés és pénzkifizetés nem lehetséges.</p>
                </div>
                <h3 className='text-decoration-underline'>Fizetési módok: </h3>
                <div className='ms-5'>
                    <h4>Kártyás fizetés:</h4>
                    <div className='ms-5'>
                        <p className='mb-1'>Ha kártyával szeretne fizetni a vásárló, akkor a termékek felütése után nincsen más teendőnk, 
                        mint a <button className='btn btn-primary'>Credit</button> gombra kattintani és megtörténik a fizetés.</p>
                    </div>
                    <h4>Készpénzes fizetés:</h4>
                    <div className='ms-5'>
                        <p className='m-0'>Fizethetünk bankjegy gombbal, abban az esetben ha a bankjegy értéke meghaladja a fizetendő összeget. <Button className={'btn btn-warning fs-4 fw-bold m-1 mt-1 mb-1 p-1 pt-3 pb-3'}>20000</Button></p>
                        <p>A számlap használatával megadjuk a vásárlótól kapott összeget, ezután a <button className='btn btn-primary me-2 ms-2'>Cash</button> gombra kattintva tudjuk kifizettetni a termékeket.</p>
                        <p>A fizetés mindkét esetben csak akkor lehetséges, ha a kapott összeg meghaladja a fizetendő összeget.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainMenu