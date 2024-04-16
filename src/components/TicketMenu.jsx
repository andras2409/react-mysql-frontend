import React, { useState } from 'react'
import Button from './Button'

const TicketMenu = ({ back, tickets, onClick }) => {

    return (
        <div className='d-flex'>
            <Button className={'btn btn-danger m-1 me-0 col-1'} onClick={back}>
                Back
            </Button>
            {tickets.map((ticket) => (
                <Button className={'col-2 btn btn-primary text-truncate m-1 me-0 p-4 pt-1 pb-1'} onClick={() => onClick(ticket)}>
                    <div className='fs-5'>{ticket.category}</div>
                    <div>{ticket.price}</div>
                </Button>
            ))}            
        </div>
    )
}

export default TicketMenu