import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { AppContext } from '../Context/App.context';

function UserItemsPage() {
    const [itemData, setItemData] = useState([]);
    const [cid, setCustid] = useState('');
    const handleCid = (event) => {
        setCustid(event.target.value);
    };
    const handleSubmit = () => {
        // setToken(user.token);
        // const headers = { Authorization: `Bearer ${user.token}` };
        // console.log(headers);
        axios
            .get('https://localhost:7223/api/DisplayItemPurchaseById/' + cid)
            .then((response) => setItemData(response.data));
        console.log(itemData);
    };
    return(
        <div>
            <div className="card text-center m-3">
                Enter Customer Id:{' '}
                <input type="text" value={cid} onChange={handleCid} />
                <button onClick={handleSubmit}> Fetch Data </button>
                {itemData.map((item, index) => (
                    <div key={index}>
                        <div className="card-body">Issue ID: {item?.issueId}</div>
                        <div className="card-body">Item Description: {item?.itemDescription}</div>
                        <div className="card-body">Item Make: {item?.itemMake}</div>
                        <div className="card-body">Item Category: {item?.itemCategory}</div>
                        <div className="card-body">Item Valuation: {item?.itemValuation}</div>

                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default UserItemsPage;