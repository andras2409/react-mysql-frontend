import React, { useState } from 'react'
import Button from './Button'

const TicketMenu = ({ back, tickets, onClick }) => {

    return (
        <div className='d-flex'>
            <Button className={'btn btn-danger m-1 me-0'} onClick={back}>
                <div>Back</div>
            </Button>
            <div className='d-flex col'>
                {tickets.map((ticket) => (
                    <Button className={'col-2 btn btn-primary text-truncate m-1 me-0 p-4 pt-1 pb-1'} onClick={() => onClick(ticket)}>
                        <div className='fs-5'>{ticket.name}</div>
                        <div>{ticket.price}</div>
                    </Button>
                ))}
            </div>
            
        </div>
    )
}

export default TicketMenu