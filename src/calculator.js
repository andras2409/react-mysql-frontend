export function ItemClicked(newItem, basket, price){
        
    let itemFound = false;

    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === newItem.name) {
            basket[i].amount++;
            itemFound = true;
            break;
        }
    }

    if (!itemFound) {
        basket.push({name: newItem.name, price: newItem.price, amount: 1});
    }

    price += parseInt(newItem.price);
}

export function TicketClicked(newTicket, basket, price){
        
    let itemFound = false;

    for (let i = 0; i < basket.length; i++) {
        if (basket[i].category === newTicket.category) {
            basket[i].amount++;
            itemFound = true;
            break;
        }
    }

    if (!itemFound) {
        basket.push({category: newTicket.category, price: newTicket.price, amount: 1});
    }

    price += parseInt(newTicket.price);
}

export function IncreaseItemAmount(indexToIncrease, price, basket, setBasket, setPrice) {
    setBasket(currentBasket => 
        currentBasket.map((item, index) => 
            index === indexToIncrease ? { ...item, amount: item.amount + 1 } : item
        )
    );
    let newPrice = price + parseInt(basket[indexToIncrease].price);
    setPrice(parseInt(newPrice));
}

export function DecreaseItemAmount(indexToDecrease, basket, setBasket, price, setPrice) {
    if (basket[indexToDecrease].amount === 1) {
        DeleteItem(indexToDecrease, setBasket, basket, setPrice, price);
    } else if (basket[indexToDecrease].amount > 1) {
        setBasket(currentBasket => 
            currentBasket.map((item, index) => 
                index === indexToDecrease ? {...item, amount: item.amount - 1} : item
            )
        );
        let newPrice = price - parseInt(basket[indexToDecrease].price);
        setPrice(parseInt(newPrice));
    }
}

export function DeleteItem(indexToDelete, setBasket, basket, setPrice, price) {
    setBasket(basket => basket.filter((_,index) => index !== indexToDelete));
    let newPrice = price - parseInt(basket[indexToDelete].amount * basket[indexToDelete].price);
    setPrice(parseInt(newPrice));
}

export function DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked) {
    setBasket([]);
    setDisplayTransaction('');
    setPrice(0);
    setAmountReceived(0);
    setPaymentMethod('');
    setChange(0);
    setBanknoteWasClicked(false);
}

export function CashPayment(price, amountReceived, setChange, setTransactionInProgress, setPaymentMethod, paymentMethod, transactionInProgress) {
    if (amountReceived >= price && price != 0 && paymentMethod === '' && transactionInProgress) {
        setChange(amountReceived - price);
        setTransactionInProgress(false);
        setPaymentMethod('cash');
    }
}

export function CreditPayment(setTransactionInProgress, setPaymentMethod, price, paymentMethod, transactionInProgress) {
    if (price > 0 && paymentMethod === '' && transactionInProgress) {
        setTransactionInProgress(false);
        setPaymentMethod('credit');
    }
}

export function CashPaymentCashier(transactionPossible, price, amountReceived, setChange, setTransactionInProgress, setPaymentMethod, paymentMethod, transactionInProgress) {
    if (amountReceived >= price && price != 0 && paymentMethod === '' && transactionInProgress && transactionPossible) {
        setChange(amountReceived - price);
        setTransactionInProgress(false);
        setPaymentMethod('cash');
    }
}

export function CreditPaymentCashier(transactionPossible, setTransactionInProgress, setPaymentMethod, price, paymentMethod, transactionInProgress) {
    if (price > 0 && paymentMethod === '' && transactionInProgress && transactionPossible) {
        setTransactionInProgress(false);
        setPaymentMethod('credit');
    }
}

export function DeleteNumbers(transactionInProgress, paymentMethod, setAmountReceived) {
    if (transactionInProgress || paymentMethod === '') {
        setAmountReceived(0);
    }
}

export function SaveItems(basket, totalItemList) {
    for (let i = 0; i < basket.length; i++) {
        totalItemList.push(basket[i]);
    }
}

export function SaveTickets(soldSeats, savedSeats) {
    for (let i = 0; i < soldSeats.length; i++) {
        savedSeats.push(soldSeats[i]);
        console.log('seats saved');
    }
}

export function SaveReservations(reservedSeats, savedReservations) {
    for (let i = 0; i < reservedSeats.length; i++) {
        console.log('savedReservations before push', savedReservations);

        savedReservations.push(reservedSeats[i]);
        console.log('reservations saved');
    }
}

export function DeleteLocalStorage() {
    localStorage.clear();
}

export function BanknoteClicked(e, transactionInProgress, price, setBanknoteWasClicked, setAmountReceived, setChange, setTransactionInProgress, setPaymentMethod, paymentMethod, setBasket, setPrice, setDisplayTransaction) {
    let banknote = e.target.value;
    if (transactionInProgress && banknote >= price && price > 0) {
        setBanknoteWasClicked(true);
        setAmountReceived(banknote);
        CashPayment(price, banknote, setChange, setTransactionInProgress, setPaymentMethod, paymentMethod, transactionInProgress);
    }
    if (paymentMethod !== '') {
        setPaymentMethod('');
        DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked);
    }
}

export function BanknoteClickedCashier(e, transactionPossible, transactionInProgress, price, setBanknoteWasClicked, setAmountReceived, setChange, setTransactionInProgress, setPaymentMethod, paymentMethod, setBasket, setPrice, setDisplayTransaction) {
    let banknote = e.target.value;
    if (transactionInProgress && banknote >= price && price > 0 && transactionPossible) {
        setBanknoteWasClicked(true);
        setAmountReceived(banknote);
        CashPaymentCashier(transactionPossible, price, banknote, setChange, setTransactionInProgress, setPaymentMethod, paymentMethod, transactionInProgress);
    }
    if (paymentMethod !== '') {
        setPaymentMethod('');
        DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked);
    }
}

export function HandleKeypadClicked(e, banknoteWasClicked, transactionInProgress, paymentMethod, setTransactionInProgress, amountReceived, setAmountReceived, setBasket, setDisplayTransaction, setPrice, setPaymentMethod, setChange, setBanknoteWasClicked) {
    let key = e.target.value;
    if (!banknoteWasClicked) {
        if (transactionInProgress && paymentMethod === '') {
            if (amountReceived === 0) {
                setAmountReceived(key);
            } else {
                setAmountReceived(amountReceived + key);
            }
        }
        if (!transactionInProgress) {
            if (paymentMethod !== '') {
                setTransactionInprogress(true);
                DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked);
                setAmountReceived(key);
            } else {
                if (amountReceived === 0) {
                    setAmountReceived(key);
                } else {
                    setAmountReceived(amountReceived + key);
                }
            }
        }
    } else {
        if (transactionInProgress && paymentMethod === '') {
            if (amountReceived === 0) {
                setAmountReceived(key);
            } else {
                setAmountReceived(amountReceived + key);
            }
        }
        if (!transactionInProgress && paymentMethod !== '') {
            setTransactionInProgress(true);
            DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked);
            setAmountReceived(key);
        }
    }
}

export function HandleItemClicked(newItem, transactionInProgress, paymentMethod, setTransactionInProgress, setPaymentMethod, setItemClicked, setItemIsClicked, setBasket, setDisplayTransaction, setPrice, setAmountReceived, setChange, setBanknoteWasClicked) {
    if (!transactionInProgress && paymentMethod === '') {
        setTransactionInProgress(true);
        setPaymentMethod('');
        setItemClicked(newItem);
        setItemIsClicked(true);
    } else if (transactionInProgress && paymentMethod === '') {
        setItemClicked(newItem);
        setItemIsClicked(true);
    }
    if (!transactionInProgress && paymentMethod === 'cash' || paymentMethod === 'credit') {
        setTransactionInProgress(true);
        setPaymentMethod('');
        setItemClicked(newItem);
        setItemIsClicked(true);
        DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked);
    }
}