import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import Button from './Button'
import Buffet from '../Buffet'
import Cashier from '../Cashier'

const Summary = ( props ) => {

    const [currentPage, setCurrentPage] = useState('Main Menu');

    const [totalCash, setTotalCash] = useState(() => JSON.parse(localStorage.getItem('totalCash')) || 0);
    const [totalCredit, setTotalCredit] = useState(() => JSON.parse(localStorage.getItem('totalCredit')) || 0);
    const [totalItemList, setTotalItemList] = useState(() => JSON.parse(localStorage.getItem('totalItemList')) || []);
    const [totalWithdrawal, setTotalWithdrawal] = useState(() => JSON.parse(localStorage.getItem('totalWithdrawal')) || 0);
    const [totalDeposit, setTotalDeposit] = useState(() => JSON.parse(localStorage.getItem('totalDeposit')) || 0);

    if (currentPage === 'Buffet') {
        return <Buffet />;
    }

    if (currentPage === 'Cashier') {
        return <Cashier />;
    }

    return (
        <>
            <Navigation>
                <Button className='btn btn-primary fs-4 mb-1' onClick={() => setCurrentPage(props.homepage)}>{props.homepage}</Button>
            </Navigation>
            <div className='col-6 p-4'>
                <div className="d-flex col-15">
                    <div className='col-4 fs-5 fw-bold'>Name</div>
                    <div className='col-4 fs-5 fw-bold d-flex justify-content-center'>Amount</div>
                    <div className='col-4 fs-5 fw-bold'>Price</div>
                </div>
                <hr className='m-1'/>
                {totalItemList.map((item, index) => (
                    <>
                        <div className='d-flex'>
                            <div className='col-4'>{item.name}</div>
                            <div className='col-4 d-flex justify-content-center'>{item.amount}</div>
                            <div className='col-4'>{item.price}</div>
                        </div>
                        <hr className='m-1'/>
                    </>
                ))}
            </div>
            <div className='p-4 col-4 fw-bold'>
                <hr />
                <div className='d-flex'>
                    <div className='col-6'>Cash:</div>
                    <div className='col-6'>{totalCash}</div>    
                </div>
                <hr />
                <div className='d-flex'>
                    <div className='col-6'>Credit:</div>
                    <div className='col-6'>{totalCredit}</div>    
                </div>
                <hr />
                <div className='d-flex'>
                    <div className='col-6'>Deposit:</div>
                    <div className='col-6'>{totalDeposit}</div>    
                </div>
                <hr />
                <div className='d-flex'>
                    <div className='col-6'>Amount Withdrawn:</div>
                    <div className='col-6'>{totalWithdrawal}</div>    
                </div>
                <hr />
            </div>
            
        </>
    )
}

export default Summary