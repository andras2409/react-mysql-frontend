import React from "react";

const ProductGroup = ({ divClass, className, items, onClick }) => {
    return (
        <>  
            <div className={divClass}>
                {items.map((item) => (
                    <button 
                        key={item.name}
                        className={className}
                        onClick={() => onClick(item)}
                    >
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                    </button>
                ))}
            </div>
        </>
    );
};

export default ProductGroup