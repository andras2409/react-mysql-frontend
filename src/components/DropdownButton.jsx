import React from "react";

const DropdownButton = ({children, title, buttonClass}) => {

    return (
        <>
            <button className={"btn btn-primary dropdown-toggle fs-5 " + buttonClass} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                {title}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div className="d-flex flex-column">
                    {children}
                </div>
            </div>
        </>
    );
};

export default DropdownButton