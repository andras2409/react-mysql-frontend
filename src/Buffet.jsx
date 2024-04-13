import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import MainMenu from './MainMenu';
import ProductGroup from './components/ProductGroup';
import DropdownButton from './components/DropdownButton';
import { 
    ItemClicked, 
    IncreaseItemAmount, 
    DecreaseItemAmount, 
    DeleteItem, 
    DeleteBasket, 
    CashPayment, 
    CreditPayment, 
    SaveItems, 
    DeleteNumbers, 
    DeleteLocalStorage, 
    BanknoteClicked,
    HandleKeypadClicked,
    HandleItemClicked
} from './calculator.js';
import Trash from './components/Trash.jsx';
import Keypad from './components/Keypad.jsx';
import BankNoteButtons from './components/BankNoteButtons.jsx';
import Summary from './components/Summary.jsx';

function Buffet() {

    useEffect(() => {
        fetch('http://localhost:8081/product')
        .then(res => res.json())
        .then(products => setProducts(products))
        .catch(err => console.log(err));
    }, [])

    const [products, setProducts] = useState([]);    
    const [currentPage, setCurrentPage] = useState('Buffet');    

    const [basket, setBasket] = useState([]);
    const [price, setPrice] = useState(0);
    const [change, setChange] = useState(0);
    const [transactionInprogress, setTransactionInprogress] = useState(false);
    const [itemIsClicked, setItemIsClicked] = useState(true);
    const [itemClicked, setItemClicked] = useState(null);
    const [amountReceived, setAmountReceived] = useState(0);
    const [banknoteWasClicked, setBanknoteWasClicked] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    //--------Displays--------//
    const [displayAmount, setDisplayAmount] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);
    const [displayTransaction, setDisplayTransaction] = useState('');
    
    //--------localStorage--------//
    const [totalItemList, setTotalItemList] = useState(() => JSON.parse(localStorage.getItem('totalItemList')) || []);
    const [totalCash, setTotalCash] = useState(() => JSON.parse(localStorage.getItem('totalCash')) || 0);
    const [totalCredit, setTotalCredit] = useState(() => JSON.parse(localStorage.getItem('totalCredit')) || 0);

    //--------Withdrawal--------//
    const [withdrawal, setWithdrawal] = useState(false);
    const [currentWithdrawalAmount, setCurrentWithdrawalAmount] = useState(0);
    const [totalWithdrawal, setTotalWithdrawal] = useState(() => JSON.parse(localStorage.getItem('totalWithdrawal')) || 0);

    //--------Debit--------//
    const [deposit, setDeposit] = useState(false);
    const [currentDeposit, setCurrentDeposit] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(() => JSON.parse(localStorage.getItem('totalDeposit')) || 0);

    useEffect(() => {
        localStorage.setItem('totalCash', JSON.stringify(totalCash));
        localStorage.setItem('totalCredit', JSON.stringify(totalCredit));
        localStorage.setItem('totalItemList', JSON.stringify(totalItemList));
        localStorage.setItem('totalWithdrawal', JSON.stringify(totalWithdrawal));
        localStorage.setItem('totalDeposit', JSON.stringify(totalDeposit));
    }, [totalCash, totalCredit, totalItemList, totalWithdrawal, totalDeposit]);

    function genericHandleItemClicked(newItem) {
        HandleItemClicked( 
            newItem, 
            transactionInprogress, 
            paymentMethod, 
            setTransactionInprogress, 
            setPaymentMethod, 
            setItemClicked, 
            setItemIsClicked, 
            setBasket, 
            setDisplayTransaction, 
            setPrice, 
            setAmountReceived, 
            setChange, 
            setBanknoteWasClicked
        );
    }

    function Withdrawal() {
        if (amountReceived > 0) {
            setWithdrawal(true);
            setCurrentWithdrawalAmount(amountReceived);
        } else {
            setDisplayTransaction(
                <ul className='list-group'>
                    <li className='list-group-item bg-danger-subtle d-flex'>
                        <div className='col-6'>Withdraw Not Possible</div>
                    </li>
                </ul>
            );
            setWithdrawal(false);
            setCurrentWithdrawalAmount(0);
            DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived)
        }
    }

    function Deposit() {
        if (amountReceived > 0) {
            setDeposit(true);
            setCurrentDeposit(amountReceived);
        } else {
            setDisplayTransaction(
                <ul className='list-group'>
                    <li className='list-group-item bg-danger-subtle d-flex'>
                        <div className='col-6'>Deposit Not Possible</div>
                    </li>
                </ul>
            );
            setDeposit(false);
            setCurrentDeposit(0);
            DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
        }
    }

    useEffect(() => {
        if (deposit) {
            if (transactionInprogress && paymentMethod === '') {
                if (price === 0) {
                    setTotalDeposit(parseInt(totalDeposit) + parseInt(currentDeposit));
                    setDisplayTransaction(
                        <ul className='list-group'>
                            <li className='list-group-item bg-success-subtle d-flex'>
                                <div className='col-6'>Deposit:</div>
                                <div>{currentDeposit}</div>
                            </li>
                        </ul>
                    );
                    setDeposit(false);
                    setCurrentDeposit(0);
                    DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
                } else {
                    setDisplayTransaction(
                        <ul className='list-group'>
                            <li className='list-group-item bg-danger-subtle d-flex'>
                                <div className='col-6'>Deposit Not Possible</div>
                            </li>
                        </ul>
                    );
                    setDeposit(false);
                    setCurrentDeposit(0);
                    DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
                }
                
            }
            if (!transactionInprogress) {
                if (paymentMethod === '') {
                    setTotalDeposit(parseInt(totalDeposit) + parseInt(currentDeposit));
                    setDisplayTransaction(
                        <ul className='list-group'>
                            <li className='list-group-item bg-success-subtle d-flex'>
                                <div className='col-6'>Deposit:</div>
                                <div>{currentDeposit}</div>
                            </li>
                        </ul>
                    );
                    setDeposit(false);
                    setCurrentDeposit(0);
                    DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
                } else {
                    setDisplayTransaction(
                        <ul className='list-group'>
                            <li className='list-group-item bg-danger-subtle d-flex'>
                                <div className='col-6'>Deposit Not Possible</div>
                            </li>
                        </ul>
                    );
                    setDeposit(false);
                    setCurrentDeposit(0);
                    DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
                }
            }
        }
    },[deposit, totalDeposit, currentDeposit, transactionInprogress, paymentMethod, price]);

    useEffect(() => {
        if (withdrawal) {
            if (parseInt(totalCash) >= parseInt(totalWithdrawal) + parseInt(currentWithdrawalAmount)) {
                if (transactionInprogress && paymentMethod === '') {
                    if (price === 0) {
                        setTotalWithdrawal(parseInt(totalWithdrawal) + parseInt(currentWithdrawalAmount));
                        setDisplayTransaction(
                            <ul className='list-group'>
                                <li className='list-group-item bg-success-subtle d-flex'>
                                    <div className='col-6'>Amount Withdrawn:</div>
                                    <div>{currentWithdrawalAmount}</div>
                                </li>
                            </ul>
                        );
                        setWithdrawal(false);
                        setCurrentWithdrawalAmount(0);
                        DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
                    } else {
                        setDisplayTransaction(
                            <ul className='list-group'>
                                <li className='list-group-item bg-danger-subtle d-flex'>
                                    <div className='col-6'>Withdraw Not Possible</div>
                                </li>
                            </ul>
                        );
                        setWithdrawal(false);
                        setCurrentWithdrawalAmount(0);
                        DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
                    }
                    
                }
                if (!transactionInprogress) {
                    if (paymentMethod === '') {
                        setTotalWithdrawal(parseInt(totalWithdrawal) + parseInt(currentWithdrawalAmount));
                        setDisplayTransaction(
                            <ul className='list-group'>
                                <li className='list-group-item bg-success-subtle d-flex'>
                                    <div className='col-6'>Amount Withdrawn:</div>
                                    <div>{currentWithdrawalAmount}</div>
                                </li>
                            </ul>
                        );
                        setWithdrawal(false);
                        setCurrentWithdrawalAmount(0);
                        DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
                    } else {
                        setDisplayTransaction(
                            <ul className='list-group'>
                                <li className='list-group-item bg-danger-subtle d-flex'>
                                    <div className='col-6'>Withdraw Not Possible</div>
                                </li>
                            </ul>
                        );
                        setWithdrawal(false);
                        setCurrentWithdrawalAmount(0);
                        DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
                    }
                }
            } else {
                setDisplayTransaction(
                    <ul className='list-group'>
                        <li className='list-group-item bg-danger-subtle d-flex'>
                            <div className='col-6'>Withdraw Not Possible</div>
                        </li>
                    </ul>
                );
                setWithdrawal(false);
                setCurrentWithdrawalAmount(0);
                DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived);
            }
        }
    },[withdrawal, transactionInprogress, paymentMethod, totalCash, totalWithdrawal, currentWithdrawalAmount]);

    useEffect(() => {
        if (transactionInprogress && itemIsClicked && itemClicked != null) {
            ItemClicked(itemClicked, basket, price);
            setBasket([...basket]);
            setPrice(price + parseInt(itemClicked.price));
        }
        setItemClicked(null);
        setDisplayPrice(price);
        setDisplayTransaction(
            <ul className={'list-group'}>
                {basket.map((item, index) => (
                    <li className={'list-group-item d-flex justify-content-between p-1'} key={index}>
                        <div className='d-flex justify-content-center align-items-center'>
                            {item.name}
                        </div>
                        <div className='btn-group col-6'>
                            <div className='d-flex col-8'>
                                <button className='btn btn-secondary' onClick={() => DecreaseItemAmount(index, basket, setBasket, price, setPrice)}>-</button>
                                <div className='d-flex justify-content-center align-items-center p-3 pt-2 pb-2 col-4'>{item.amount}</div>
                                <button className='btn btn-secondary' onClick={() => IncreaseItemAmount(index, price, basket, setBasket, setPrice)}>+</button>
                            </div>
                            <Trash divClass={'d-flex justify-content-center col-4'} onClick={() => DeleteItem(index, setBasket, basket, setPrice, price)}/>
                        </div>
                    </li>
                ))}
            </ul>
        );
    },[transactionInprogress, itemIsClicked, itemClicked, basket, price]);

    useEffect(() => {
        if (!transactionInprogress && price === 0) {
            setDisplayPrice(price);
            setDisplayAmount(amountReceived);
        } else if (transactionInprogress) {
            setDisplayPrice(price);
            setDisplayAmount(amountReceived);
        } else {
            setDisplayPrice(price);
            setDisplayAmount('Change: ' + change);
        }

        if (!transactionInprogress) {
            if (paymentMethod === 'cash') {
                SaveItems(basket, totalItemList);
                setTotalCash(totalCash + price);
                setDisplayTransaction(
                    <>
                        <ul className='list-group'>
                            <li className='list-group-item bg-success-subtle d-flex'>
                                <div className='col-6'>Payment Method:</div>
                                <div>{paymentMethod}</div>
                            </li>
                            <li className='list-group-item bg-success-subtle d-flex'>
                                <div className='col-6'>Price:</div>
                                <div>{price}</div>
                            </li>
                            <li className='list-group-item bg-success-subtle d-flex'>
                                <div className='col-6'>Amount Received:</div>
                                <div>{amountReceived}</div>
                            </li>
                            <li className='list-group-item bg-success-subtle d-flex'>
                                <div className='col-6'>Change:</div>
                                <div>{change}</div>
                            </li>
                        </ul> 
                    </>
                );
            }
            if (paymentMethod === 'credit') {
                SaveItems(basket, totalItemList);
                setTotalCredit(totalCredit + price);
                setDisplayTransaction(
                    <>
                        <ul className='list-group'>
                            <li className='list-group-item bg-success-subtle'>Payment Method: {paymentMethod}</li>
                            <li className='list-group-item bg-success-subtle'>Price: {price}</li>
                        </ul> 
                    </>
                );
            }
        }
    },[price, amountReceived, transactionInprogress, change]);

    if (currentPage === 'back-to-main') {
        return <MainMenu />;
    } else if (currentPage === 'summary') {
        return <Summary homepage="Buffet" />;
    }

    return (
        <> 
            <div className='d-flex vh-100'>
                <div className='d-flex col-8 bg-dark bg-gradient p-1'>
                    <div className='d-flex flex-column flex-fill col-11'>
                        <div className="d-flex col-12">
                            <div className='col-8'>
                                <ProductGroup  divClass={'d-flex'} className={'btn btn-primary col-1 m-1 p-2 flex-fill'} items={products.filter(products => products.type === 'popcorn')} onClick={(e) => genericHandleItemClicked(e)}/>
                                <ProductGroup divClass={'d-flex'} className={'btn bg-primary-subtle col-1 m-1 p-2 flex-fill'} items={products.filter(products => products.type === 'popcornmenu')} onClick={(e) => genericHandleItemClicked(e)}/>
                                <ProductGroup divClass={'d-flex'} className={'btn bg-danger-subtle col-1 m-1 p-2 flex-fill'} items={products.filter(products => products.type === 'pepsidrink')} onClick={(e) => genericHandleItemClicked(e)}/>
                                <ProductGroup divClass={'d-flex'} className={'btn btn-primary col-1 m-1 p-2 flex-fill'} items={products.filter(products => products.type === 'nachos')} onClick={(e) => genericHandleItemClicked(e)}/>
                                <ProductGroup divClass={'d-flex'} className={'btn bg-primary-subtle col-1 m-1 p-2 flex-fill'} items={products.filter(products => products.type === 'nachosmenu')} onClick={(e) => genericHandleItemClicked(e)}/>
                            </div>
                            <ProductGroup divClass={'col-2 d-flex flex-column'} className={'btn btn-dark flex-fill m-1'} items={products.filter(products => products.type === 'extra')} onClick={(e) => genericHandleItemClicked(e)}/>
                            <div className='d-flex flex-column col-2'>
                                <ProductGroup divClass={'col d-flex flex-column'} className={'btn btn-secondary flex-fill m-1'} items={products.filter(products => products.type === 'snackgram')} onClick={(e) => genericHandleItemClicked(e)}/>
                                <ProductGroup divClass={'col d-flex flex-column'} className={'btn btn-secondary flex-fill m-1'} items={products.filter(products => products.type === 'energydrink')} onClick={(e) => genericHandleItemClicked(e)}/>
                            </div>
                        </div>
                        <div className='d-flex col-12'>
                            <div className="col-6 d-flex flex-column justify-content-between">
                                <ProductGroup divClass={'d-flex flex-wrap'} className={'btn btn-success col-3 flex-fill m-1'} items={products.filter(products => products.type === 'bottleddrink')} onClick={(e) => genericHandleItemClicked(e)}/>
                                <ProductGroup divClass={'d-flex flex-wrap'} className={'btn btn-danger col-1 flex-fill m-1'} items={products.filter(products => products.type === 'alcoholicdrink')} onClick={(e) => genericHandleItemClicked(e)}/>
                            </div>
                            <ProductGroup divClass={'d-flex flex-wrap col-6'} className={'btn btn-warning col-3 flex-fill m-1'} items={products.filter(products => products.type === 'snack')} onClick={(e) => genericHandleItemClicked(e)}/>
                        </div>
                    </div>
                    <BankNoteButtons onClick={(e) => BanknoteClicked(e, transactionInprogress, price, setBanknoteWasClicked, setAmountReceived, setChange, setTransactionInprogress, setPaymentMethod, paymentMethod, setBasket, setPrice, setDisplayTransaction)} />
                </div>
                <div className='col-3 d-flex flex-column flex-fill justify-content-between bg-secondary bg-gradient'>
                    <div className='bg-dark text-white d-flex justify-content-center fs-3 fw-bold'>
                        {displayPrice}
                    </div>
                    <div className={'h-100 overflow-auto m-2'}>
                        {displayTransaction}
                    </div>
                    <div className='d-flex justify-content-center align-items-center text-white fs-4 fw-bold bg-dark m-2 mt-0'>
                        {displayAmount}
                    </div>
                    <div className="d-flex justify-content-around">
                        <div className='col-4 p-1 pt-0 pb-0 d-flex'>
                            <Button className={'btn btn-primary flex-fill fs-6'} onClick={() => DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived)}>Delete Number</Button>
                        </div>
                        <div className='col-4 p-1 pt-0 pb-0 d-flex'>
                            <Button className={'btn btn-primary flex-fill fs-6'} onClick={() => Withdrawal()}>WD</Button>
                        </div>
                        <div className='col-4 p-1 pt-0 pb-0 d-flex'>
                            <Button className={'btn btn-primary flex-fill fs-6'} onClick={() => Deposit()}>Deposit</Button>
                        </div>
                    </div>
                    <Keypad 
                        keypad={(e) => HandleKeypadClicked(e, banknoteWasClicked, transactionInprogress, paymentMethod, setTransactionInprogress, amountReceived, setAmountReceived, setBasket, setDisplayTransaction, setPrice, setPaymentMethod, setChange, setBanknoteWasClicked)}
                        cash={() => CashPayment(price, amountReceived, setChange, setTransactionInprogress, setPaymentMethod, paymentMethod, transactionInprogress)}
                        credit={() => CreditPayment(setTransactionInprogress, setPaymentMethod, price, paymentMethod, transactionInprogress)}
                    />
                </div>
                <div className='d-flex flex-column justify-content-between col-1 bg-dark p-2'>
                    <DropdownButton title={currentPage}>
                        <Button id={'back-to-main'} className={'btn btn-outline-primary m-2 p-2 fs-5'} onClick={() => setCurrentPage('back-to-main')}>Back To Main Menu</Button>
                        <Button id={'back-to-main'} className={'btn btn-outline-primary m-2 p-2 fs-5'} onClick={() => setCurrentPage('summary')}>Summary</Button>
                    </DropdownButton>
                    <div>
                        <Button className={'btn btn-primary fs-6 m-1'} onClick={() => DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked)}>Delete Basket</Button>
                        <Button className={'btn btn-primary fs-6 m-1'} onClick={() => DeleteLocalStorage()}>Delete Storage</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Buffet;