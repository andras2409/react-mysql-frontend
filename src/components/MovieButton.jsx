import React from 'react'

const MovieButton = ({ title, startingTime, classification, seats, onClick }) => {
    return (
        <button className='btn btn-primary fs-5 col-2 m-1 mt-0 mb-0 me-1 ms-0' onClick={onClick}>
            <div className='row'>
                <div className='col text-truncate fw-bold fs-5'>{title}</div>
            </div>
            <div className="row justify-content-center fw-semibold fs-6">{startingTime}</div>
            <div className='row'>
                <div className='col fs-6 d-flex justify-content-start'>{classification}</div>
                <div className='col fs-6 d-flex justify-content-end'>{seats}</div>
            </div>
        </button>
    )
}

export default MovieButton