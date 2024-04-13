import React from 'react';

const Keypad = ({ keypad, cash, credit }) => {
        
    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex col-12">
                    <button key={7} value={7} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>7</button>
                    <button key={8} value={8} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>8</button>
                    <button key={9} value={9} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>9</button>
                </div>
                <div className="d-flex col-12">
                    <button key={4} value={4} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>4</button>
                    <button key={5} value={5} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>5</button>
                    <button key={6} value={6} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>6</button>
                </div>
                <div className="d-flex col-12">
                    <button key={1} value={1} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>1</button>
                    <button key={2} value={2} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>2</button>
                    <button key={3} value={3} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>3</button>
                </div>
                <div className="d-flex col-12">
                    <button key={'cash'} onClick={cash} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>Cash</button>
                    <button key={0} value={0} onClick={keypad} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>0</button>
                    <button key={'credit'} onClick={credit} className={'btn btn-dark fs-3 m-1 col-4 flex-fill'}>Credit</button>
                </div>
            </div>
        </>
    )
}

export default Keypad