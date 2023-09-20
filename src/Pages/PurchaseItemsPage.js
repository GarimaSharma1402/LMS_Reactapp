import axios from 'axios';
import React, { useContext,useState, useEffect } from 'react';
import { AppContext } from '../Context/App.context';

const PurchaseItemsPage = () => {
    const { user, setUser } = useContext(AppContext);
    const [eid, setEid] = useState(null);
    const [icategory, setIcategory] = useState(null);
    const [desc, setDesc] = useState(null);
    const [ivalue, setIvalue] = useState(null);
    const [imake, setImake] = useState(null);
    const handleEid =(event) =>{
        setEid(event.target.value);
    }
    const handleIcategory =(event) =>{
        setIcategory(event.target.value);
    }
    const handleDesc =(event) =>{
        setDesc(event.target.value);
    }
    const handleIvalue =(event) =>{
        setIvalue(event.target.value);
    }
    const handleImake =(event) =>{
        setImake(event.target.value);
    }
    const handleApply = () =>
    {
        alert("Functionality coming soon...")
    };
    return (
        <div>
            <h2>Select Product and Apply for Loan</h2>
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
               {/* {Error && <div>Invalid Details </div>} */}
            </form> 
            <button onClick={() => { setUser(null) }}> Logout </button>
        </div>
    )
}
export default PurchaseItemsPage;