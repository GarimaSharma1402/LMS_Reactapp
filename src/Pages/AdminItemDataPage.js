import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { AppContext } from '../Context/App.context';

function AdminLoanDataPage() {
    const [itemdata, setItemdata] = useState([]);
    const [AllItemData, setAllItemData] = useState([]);
    //const [cid, setCustid] = useState('');
    const { user, setUser } = useContext(AppContext);
    const[Error, setError] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [token, setToken] = useState('');
    const [itemEditObj,setItemEditObj] = useState({itemId: '', itemDesc: '', issueStatus: '', itemCat: '', itemValue: '', itemMake: '', itemCatNavigation: 'null', itemMakeNavigation: 'null'});
    const[itemId,setItemId] = useState('');
    const[itemDesc,setItemDesc] = useState('');
    const[issueStatus,setIssueStatus] = useState('');
    const[itemCat,setItemCat] = useState('');
    const[itemValue,setItemValue] = useState('');
    const [itemMake,setItemMake] = useState('');
    const itemCatNavigation = null;
    const itemMakeNavigation = null;


    // const handleCid = (event) => {
    //     setCustid(event.target.value);
    // };

    const handleSubmit = () => {
        setToken(user.token);
        const headers = { Authorization: `Bearer ${user.token}` };
        console.log(headers);
        axios
            .get('https://localhost:7223/api/' + cid)
            .then((response) => setItemdata(response.data));
        console.log(itemdata);
    };
    const handleItemdata = () => {
        axios
            .get('https://localhost:7223/api/')
            .then((result) => setAllItemData(result.data));
    };
    const handleItemId =(event) => {
        setItemId(event.target.value);
    }
    const handleItemDesc =(event) => {
        setItemDesc(event.target.value);
    }
    const handleIssueStatus =(event) => {
        setIssueStatus(event.target.value);
    }
    const handleItemCat =(event) => {
        setItemCat(event.target.value);
    }
    const handleItemValue =(event) => {
        setItemValue(event.target.value);
    }
    const handleItemMake =(event) => {
        setItemMake(event.target.value);
    }
    const handleEditItem = () => {
        setIsFormOpen(true);
    };
    const handleSubmitEditItem = async(event)=>{
        itemEditObj.itemId = itemId;
        itemEditObj.itemDesc = itemDesc;
        itemEditObj.issueStatus = issueStatus;
        itemEditObj.itemCat = itemCat;
        itemEditObj.itemValue = itemValue;
        itemEditObj.itemMake = itemMake;
        itemEditObj.itemCatNavigation = itemCatNavigation;
        itemEditObj.itemMakeNavigation = itemMakeNavigation;
        event.preventDefault();
        try{
            const response=await axios
                .put('https://localhost:7223/api/' + itemId,
                itemEditObj
                )
                alert(response.data);
        }
        catch(error){
            setError(true);
        }
        setIsFormOpen(false);
    }

    return (
        <div>
            <div className="card text-center m-3">
                <h1>Item Data Management</h1>
                <h3>Add New Item Data </h3>
                <form >
                    <div>
                    Item Category: 
                        <select>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Crockery">Crockery</option>
                        </select>
                    </div>
                    <div>
                        Item Description: <input type="text" />
                    </div>
                    <div>
                        Item Value: <input type="text" />
                    </div>
                    <div>
                        Issue Status:
                        <select>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        Item Make:
                        <select>
                            <option value="Wooden">Wooden</option>
                            <option value="Glass">Glass</option>
                            <option value="Plastic">Plastic</option>
                        </select>
                    </div>
                    <div>
                        <button type = "submit"> Add New Item </button>
                    </div>
                </form>                    
                <br></br>     
                {/* <h3> View Loan Details: </h3>
                Enter Customer Id:{' '}
                <input type="text" value={cid} onChange={handleCid} />
                <button onClick={handleSubmit}> Fetch Data </button> */}
                
                {itemdata.map((item, index) => (
                    <div key={index}>
                        <div className="card-body">Item Id: {item?.itemId}</div>
                        <div className="card-body">Item Category: {item?.itemCat}</div>
                        <div className="card-body">Item Description: {item?.itemDesc}</div>
                        <div className="card-body">Item Value: {item?.itemValue}</div>
                        <div className="card-body">Issue Status: {item?.issueStatus}</div>
                        <div className="card-body">Item Make: {item?.itemMake}</div>
                        <div> <Button className="btn1" onClick={handleEditItem}>Edit Items</Button> </div>
                        <div> <Button className = "btn1">Delete Items</Button> </div>
                        <br></br>
                    </div>
                ))}
                <button onClick={handleItemdata}>Get Loan data for all Customers </button> 
                // {AllItemData.map((AllItemData, index) => (
                //     <div key={index}>
                //         <div className="card-body">Item ID: {AllLoanData?.loanId}</div>
                //         <div className="card-body">Loan Type: {AllLoanData?.loanType}</div>
                //         <div className="card-body">
                //             Loan Duration: {AllLoanData?.durationInYears}
                //         </div>
                //         <div> <Button className="btn1" onClick={handleEditLoan}>Edit Loans</Button> 
                //         {isFormOpen &&(
                //             <form onSubmit={handleSubmitEditLoan}>
                //                 <div>
                //                     Loan ID: <input type="text" value={loanId} onChange={handleLoanId} />
                //                 </div>
                //                 <div>
                //                     Loan Type: 
                //                     <select value={loanType} onChange={handleLoanType}>
                //                     <option value="Furniture">Furniture</option>
                //                     <option value="Stationery">Stationery</option>
                //                     <option value="Crockery">Crockery</option>
                //                     </select>
                //                 </div>
                //                 <div>
                //                     Loan Duration: <input type="text" value={durationInYears} onChange={handleLoanDuration} />
                //                 </div>
                //                 <div>
                //                     <button type = "submit"> Edit Details </button>
                //                 </div>
                //             </form>

                //        )}  
                            
                //         </div>

                //         <div> <Button className = "btn1">Delete Loans</Button> </div>
                //         <br></br>
                //     </div>
                // ))}
                <button onClick={() => { setUser(null) }}> Logout </button>
            </div>
        </div>
    );
}
export default AdminItemDataPage;
