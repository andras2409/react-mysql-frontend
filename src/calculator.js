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

export function CashPayment(price, amountReceived, setChange, setTransactionInprogress, setPaymentMethod, paymentMethod, transactionInprogress) {
    if (amountReceived >= price && price != 0 && paymentMethod === '' && transactionInprogress) {
        setChange(amountReceived - price);
        setTransactionInprogress(false);
        setPaymentMethod('cash');
    }
}

export function CreditPayment(setTransactionInprogress, setPaymentMethod, price, paymentMethod, transactionInprogress) {
    if (price > 0 && paymentMethod === '' && transactionInprogress) {
        setTransactionInprogress(false);
        setPaymentMethod('credit');
    }
}

export function DeleteNumbers(transactionInprogress, paymentMethod, setAmountReceived) {
    if (transactionInprogress || paymentMethod === '') {
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

export function DeleteLocalStorage() {
    localStorage.clear();
}

export function BanknoteClicked(e, transactionInprogress, price, setBanknoteWasClicked, setAmountReceived, setChange, setTransactionInprogress, setPaymentMethod, paymentMethod, setBasket, setPrice, setDisplayTransaction) {
    let banknote = e.target.value;
    if (transactionInprogress && banknote >= price && price > 0) {
        setBanknoteWasClicked(true);
        setAmountReceived(banknote);
        CashPayment(price, banknote, setChange, setTransactionInprogress, setPaymentMethod, paymentMethod, transactionInprogress);
    }
    if (paymentMethod !== '') {
        setPaymentMethod('');
        DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked);
    }
}

export function HandleKeypadClicked(e, banknoteWasClicked, transactionInprogress, paymentMethod, setTransactionInprogress, amountReceived, setAmountReceived, setBasket, setDisplayTransaction, setPrice, setPaymentMethod, setChange, setBanknoteWasClicked) {
    let key = e.target.value;
    if (!banknoteWasClicked) {
        if (transactionInprogress && paymentMethod === '') {
            if (amountReceived === 0) {
                setAmountReceived(key);
            } else {
                setAmountReceived(amountReceived + key);
            }
        }
        if (!transactionInprogress) {
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
        if (transactionInprogress && paymentMethod === '') {
            if (amountReceived === 0) {
                setAmountReceived(key);
            } else {
                setAmountReceived(amountReceived + key);
            }
        }
        if (!transactionInprogress && paymentMethod !== '') {
            setTransactionInprogress(true);
            DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked);
            setAmountReceived(key);
        }
    }
}

export function HandleItemClicked(newItem, transactionInprogress, paymentMethod, setTransactionInprogress, setPaymentMethod, setItemClicked, setItemIsClicked, setBasket, setDisplayTransaction, setPrice, setAmountReceived, setChange, setBanknoteWasClicked) {
    if (!transactionInprogress && paymentMethod === '') {
        setTransactionInprogress(true);
        setPaymentMethod('');
        setItemClicked(newItem);
        setItemIsClicked(true);
    } else if (transactionInprogress && paymentMethod === '') {
        setItemClicked(newItem);
        setItemIsClicked(true);
    }
    if (!transactionInprogress && paymentMethod === 'cash' || paymentMethod === 'credit') {
        setTransactionInprogress(true);
        setPaymentMethod('');
        setItemClicked(newItem);
        setItemIsClicked(true);
        DeleteBasket(setBasket, setDisplayTransaction, setPrice, setAmountReceived, setPaymentMethod, setChange, setBanknoteWasClicked);
    }
}