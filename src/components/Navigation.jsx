import React from "react";

const Navigation = ({children}) => {

    return (
        <>
            <nav className='bg-dark p-2 d-flex justify-content-between'>
                {children}
            </nav>
        </>
    );
};

export default Navigation