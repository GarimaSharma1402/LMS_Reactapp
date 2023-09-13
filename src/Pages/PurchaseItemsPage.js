import axios from 'axios';
import React from 'react';

const PurchaseItemsPage = () => {
    return (
        <div>
           <form onSubmit={handleApply}>
                <div>
                    EmployeeID: <input type="text" value={eid} onChange={handleEid} />
                </div>
                <div>
                    Item Category:
                    <select value={icategory} onChange={handleIcategory}>
                        <option value="Furniture">Furniture</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Crockery">Crockery</option>
                    </select>
                </div>
                <div>
                    Item Description: <input type="text" value={desc} onChange={handleDesc} />
                </div>
                <div>
                   Item Value: <input type="text" value={ivalue} onChange={handleIvalue} />
                </div>
                <div>
                    Item Make:
                    <select value={imake} onChange={handleImake}>
                        <option value="Wooden">Wooden</option>
                        <option value="Glass">Glass</option>
                        <option value="Plastic">Plastic</option>
                    </select>
                </div>
                <div>
                    <button type="submit"> Apply Loan </button>
                </div>
               {Error && <div>Invalid Details </div>}
            </form> 
        </div>
    )
}