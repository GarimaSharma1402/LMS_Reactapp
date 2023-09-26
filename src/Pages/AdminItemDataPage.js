import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { AppContext } from '../Context/App.context';

function AdminItemDataPage() {
    const [deleteItemId, setDeleteItemId] = useState('');
    const [itemdata, setItemdata] = useState([]);
    const [AllItemData, setAllItemData] = useState([]);
    const [cid, setCustid] = useState('');
    const { user, setUser } = useContext(AppContext);
    const[Error, setError] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newItemObj, setNewItemObj] = useState({issueStatus: '',itemDescription: '', itemMake: '',itemCategory: '',itemValuation: ''});
    const [token, setToken] = useState('');
    const [itemEditObj,setItemEditObj] = useState({itemId: '', issueStatus: '',itemDescription: '', itemMake: '',itemCategory: '',itemValuation: ''});
    const[itemId,setItemId] = useState('');
    const[itemDesc,setItemDesc] = useState('');
    const[issueStatus,setIssueStatus] = useState('');
    const[itemCat,setItemCat] = useState('');
    const[itemValue,setItemValue] = useState('');
    const [itemMake,setItemMake] = useState('');
    const itemCatNavigation = null;
    const itemMakeNavigation = null;


 

    const handleSubmit = () => {
        setToken(user.token);
        const headers = { Authorization: `Bearer ${user.token}` };
        console.log(headers);
        axios
            .get('https://localhost:7223/api/' + cid)
            .then((response) => setItemdata(response.data));
        console.log(itemdata);
    };
    // const handleItemdata = () => {
    //     axios
    //         .get('https://localhost:7223/api/')
    //         .then((result) => setAllItemData(result.data));
    // };
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
    const handleNewItem  = async (event) =>{
        newItemObj.issueStatus = issueStatus;
        newItemObj.itemDescription = itemDesc;
        newItemObj.itemMake = itemMake;
        newItemObj.itemCategory = itemCat;
        newItemObj.itemValuation = itemValue;
        
        event.preventDefault();
        try{
            const response=await axios
                .post('https://localhost:7223/api/AdminItemDataManagement',
                newItemObj
                )
            
            console.log(response.data);
           
        }
        catch(error){
            setError(true);
        }
  
    
    }
    
    const handleAllItemsdata = () => {
        axios
            .get('https://localhost:7223/api/AdminItemDataManagement')
            .then((result) => setAllItemData(result.data));
        console.log(AllItemData);
    };
    const handleSubmitEditItem = async(event)=>{
        itemEditObj.itemId = itemId
        itemEditObj.issueStatus = issueStatus;
        itemEditObj.itemDescription = itemDesc;
        itemEditObj.itemMake = itemMake;
        itemEditObj.itemCategory = itemCat;
        itemEditObj.itemValuation = itemValue;
        event.preventDefault();
        try{
            const response=await axios
                .put('https://localhost:7223/api/AdminItemDataManagement/' + itemId,
                itemEditObj
                )
                alert(" Item Id "+ itemId+" updated successfully");
        }
        catch(error){
            setError(true);
        }
        setIsFormOpen(false);
    }
    const handleDeleteItemId =(event) => {
        setDeleteItemId(event.target.value);
    }
    const handleDeleteItem = (event) => {
        event.preventDefault();
        axios
            .delete('https://localhost:7223/api/AdminItemDataManagement/' + deleteItemId)
            .then(result => {console.log("deleted successfully")
        })
        alert(" Item Id "+ deleteItemId+" deleted successfully");
    
    }

    return (
        <div>
            <div className="card text-center m-3">
                <h1>Item Data Management</h1>
                <h3>Add New Item Data </h3>
                <form onSubmit={handleNewItem}>
                    <div>
                    Item Category: 
                        <select onChange={handleItemCat}>
                        <   option value="select">Select</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Crockery">Crockery</option>
                        </select>
                    </div>
                    <div>
                        Item Description: <input type="text" onChange={handleItemDesc}/>
                    </div>
                    <div>
                        Item Value: <input type="text" onChange={handleItemValue} />
                    </div>
                    <div>
                        Issue Status:
                        <select onChange={handleIssueStatus}>
                            <option value="select">Select</option>
                            <option value="issued">Yes</option>
                            <option value="waiting">Waiting</option>
                            <option value="rejected">No</option>
                        </select>
                    </div>
                    <div>
                        Item Make:
                        <select onChange={handleItemMake}>
                            <option value="select">Select</option>
                            <option value="Wood">Wooden</option>
                            <option value="Glass">Glass</option>
                            <option value="Plastic">Plastic</option>
                        </select>
                    </div>
                    <div>
                        <button type = "submit"> Add New Item </button>
                    </div>
                </form>                    
                <br></br>     
                <button onClick={handleAllItemsdata}>Get All Items Data</button>
                {AllItemData.map((AllItemData, index) => (
                    <div key={index}>
                        <div className="card-body">Item ID: {AllItemData?.itemId}</div>
                        <div className="card-body">Item Description: {AllItemData?.itemDescription}</div>
                        <div className="card-body">Issue Status: {AllItemData?.issueStatus}</div>
                        <div className="card-body">Item Make: {AllItemData?.itemMake}</div>
                        <div className="card-body">Item Category: {AllItemData?.itemCategory}</div>
                        <div className="card-body">Item Valuation: {AllItemData?.itemValuation}</div>
                        
                        <div> <Button className="btn1" onClick={handleEditItem}>Edit Items</Button> 
                        {isFormOpen &&(
                            <form onSubmit={handleSubmitEditItem}>
                                <div>
                                   Item ID: <input type="text" value={itemId} onChange={handleItemId} />
                                </div>
                                <div>
                    Item Category: 
                        <select onChange={handleItemCat}>
                        <   option value="select">Select</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Crockery">Crockery</option>
                        </select>
                    </div>
                    <div>
                        Item Description: <input type="text" onChange={handleItemDesc}/>
                    </div>
                    <div>
                        Item Value: <input type="text" onChange={handleItemValue} />
                    </div>
                    <div>
                        Issue Status:
                        <select onChange={handleIssueStatus}>
                            <option value="select">Select</option>
                            <option value="issued">Yes</option>
                            <option value="waiting">Waiting</option>
                            <option value="rejected">No</option>
                        </select>
                    </div>
                    <div>
                        Item Make:
                        <select onChange={handleItemMake}>
                            <option value="select">Select</option>
                            <option value="Wood">Wooden</option>
                            <option value="Glass">Glass</option>
                            <option value="Plastic">Plastic</option>
                        </select>
                    </div>
                                <div>
                                    <button type = "submit"> Edit Details </button>
                                </div>
                            </form>

                        )}  
                            
                        </div>

                        <div> 
                            <form onSubmit={handleDeleteItem}>
                            <div>
                                Loan Id to delete: <input type="text" onChange={handleDeleteItemId} />
                            </div> 
                            <div><Button className = "btn1" type="submit" >Delete Items</Button>
                            </div>

                            </form> 
                        </div>
                        <br></br>
                    </div>
                ))}
                <button onClick={() => { setUser(null) }}> Logout </button>

            </div>
        </div> 
    );
}
export default AdminItemDataPage;
