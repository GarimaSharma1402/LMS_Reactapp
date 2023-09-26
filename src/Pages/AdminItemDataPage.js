import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../Context/App.context';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AdminItemDataPage() {
    const [deleteItemId, setDeleteItemId] = useState('');
    const [itemdata, setItemdata] = useState([]);
    const [AllItemData, setAllItemData] = useState([]);
    const [cid, setCustid] = useState('');
    const { user, setUser } = useContext(AppContext);
    const [Error, setError] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newItemObj, setNewItemObj] = useState({ issueStatus: '', itemDescription: '', itemMake: '', itemCategory: '', itemValuation: '' });
    const [token, setToken] = useState('');
    const [itemEditObj, setItemEditObj] = useState({ itemId: '', issueStatus: '', itemDescription: '', itemMake: '', itemCategory: '', itemValuation: '' });
    const [itemId, setItemId] = useState('');
    const [itemDesc, setItemDesc] = useState('');
    const [issueStatus, setIssueStatus] = useState('');
    const [itemCat, setItemCat] = useState('');
    const [itemValue, setItemValue] = useState('');
    const [itemMake, setItemMake] = useState('');
    const [isModalOpen2, setModalOpen2] = useState(false);
    const itemCatNavigation = null;
    const itemMakeNavigation = null;

    const openModal2 = () => { setModalOpen2(true); }
    const closeModal2 = () => { setModalOpen2(false); }


    const handleSubmit = () => {
        setToken(user.token);
        const headers = { Authorization: `Bearer ${user.token}` };
        console.log(headers);
        axios
            .get('https://localhost:7223/api/' + cid)
            .then((response) => setItemdata(response.data));
        console.log(itemdata);
    };
    const handleItemId = (event) => {
        setItemId(event.target.value);
    }
    const handleItemDesc = (event) => {
        setItemDesc(event.target.value);
    }
    const handleIssueStatus = (event) => {
        setIssueStatus(event.target.value);
    }
    const handleItemCat = (event) => {
        setItemCat(event.target.value);
    }
    const handleItemValue = (event) => {
        setItemValue(event.target.value);
    }
    const handleItemMake = (event) => {
        setItemMake(event.target.value);
    }
    const handleEditItem = () => {
        setIsFormOpen(true);
    };
    const handleNewItem = async (event) => {
        newItemObj.issueStatus = issueStatus;
        newItemObj.itemDescription = itemDesc;
        newItemObj.itemMake = itemMake;
        newItemObj.itemCategory = itemCat;
        newItemObj.itemValuation = itemValue;

        event.preventDefault();
        try {
            const response = await axios
                .post('https://localhost:7223/api/AdminItemDataManagement',
                    newItemObj
                )

            console.log(response.data);

        }
        catch (error) {
            setError(true);
        }
    }

    const handleAllItemsdata = () => {
        axios
            .get('https://localhost:7223/api/AdminItemDataManagement')
            .then((result) => setAllItemData(result.data));
        console.log(AllItemData);
    };
    const handleSubmitEditItem = async (event) => {
        itemEditObj.itemId = itemId
        itemEditObj.issueStatus = issueStatus;
        itemEditObj.itemDescription = itemDesc;
        itemEditObj.itemMake = itemMake;
        itemEditObj.itemCategory = itemCat;
        itemEditObj.itemValuation = itemValue;
        event.preventDefault();
        try {
            const response = await axios
                .put('https://localhost:7223/api/AdminItemDataManagement/' + itemId,
                    itemEditObj
                )
            alert(" Item Id " + itemId + " updated successfully");
        }
        catch (error) {
            setError(true);
        }
        setIsFormOpen(false);
    }
    const handleDeleteItemId = (event) => {
        setDeleteItemId(event.target.value);
    }
    const handleDeleteItem = (event) => {
        event.preventDefault();
        axios
            .delete('https://localhost:7223/api/AdminItemDataManagement/' + deleteItemId)
            .then(result => {
                console.log("deleted successfully")
            })
        alert(" Item Id " + deleteItemId + " deleted successfully");

    }

    return (
        <div>
            <Card className="text-center m-3">
                <CardContent>
                    <Typography variant="h4">Item Data Management</Typography>
                    <Typography variant="h5">Add New Item Data</Typography>
                    <form onSubmit={handleNewItem}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Item Category</InputLabel>
                            <Select
                                label="Item Category"
                                value={itemCat}
                                onChange={handleItemCat}
                            >
                                <MenuItem value="select">Select</MenuItem>
                                <MenuItem value="Furniture">Furniture</MenuItem>
                                <MenuItem value="Stationery">Stationery</MenuItem>
                                <MenuItem value="Crockery">Crockery</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" fullWidth>
                            <TextField
                                label="Item Description"
                                type="text"
                                variant="outlined"
                                value={itemDesc}
                                onChange={handleItemDesc}
                            />
                        </FormControl>
                        <FormControl variant="outlined" fullWidth>
                            
                            <TextField
                                label="Item Value"
                                type="text"
                                variant="outlined"
                                value={itemValue}
                                onChange={handleItemValue}
                            />
                        </FormControl>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Issue Status</InputLabel>
                            <Select
                                label="Issue Status"
                                value={issueStatus}
                                onChange={handleIssueStatus}
                            >
                                <MenuItem value="select">Select</MenuItem>
                                <MenuItem value="issued">Yes</MenuItem>
                                <MenuItem value="waiting">Waiting</MenuItem>
                                <MenuItem value="rejected">No</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Item Make</InputLabel>
                            <Select
                                label="Item Make"
                                value={itemMake}
                                onChange={handleItemMake}
                            >
                                <MenuItem value="select">Select</MenuItem>
                                <MenuItem value="Wood">Wooden</MenuItem>
                                <MenuItem value="Glass">Glass</MenuItem>
                                <MenuItem value="Plastic">Plastic</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit">
                            Add New Item
                        </Button>
                    </form>
                    <br />
                    <Button variant="contained" color="primary" onClick={handleAllItemsdata}>
                        Get All Items Data
                    </Button>

                    {AllItemData.map((item, index) => (
                        <div key={index} className="card text-center m-3">
                            <CardContent>
                            <Typography variant="h6">Item Description: {item?.itemDescription}</Typography>
                                <Typography variant="body1">Item ID: {item?.itemId}</Typography>
                                <Typography variant="body1">Issue Status: {item?.issueStatus}</Typography>
                                <Typography variant="body1">Item Make: {item?.itemMake}</Typography>
                                <Typography variant="body1">Item Category: {item?.itemCategory}</Typography>
                                <Typography variant="body1">Item Valuation: {item?.itemValuation}</Typography>

                                <div>
                                    <Button variant="contained" color="warning" onClick={() => handleEditItem(item)}>
                                        Edit Items
                                    </Button>
                                    <Modal
                                        open={isFormOpen}
                                        onClose={() => setIsFormOpen(false)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography variant="h6" component="h2">
                                                Edit Loan Details
                                            </Typography>
                                            <form onSubmit={handleSubmitEditItem}>
                                                <div>
                                                    <FormControl fullWidth variant="outlined">
                                                        <TextField
                                                            label="Item ID"
                                                            type="text"
                                                            value={itemId}
                                                            onChange={handleItemId}
                                                            fullWidth
                                                            variant="outlined"
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div>
                                                    <FormControl fullWidth variant="outlined">
                                                        <InputLabel>Item Category</InputLabel>
                                                        <Select
                                                            label="Item Category"
                                                            value={itemCat}
                                                            onChange={handleItemCat}
                                                        >
                                                            <MenuItem value="select">Select</MenuItem>
                                                            <MenuItem value="Furniture">Furniture</MenuItem>
                                                            <MenuItem value="Stationery">Stationery</MenuItem>
                                                            <MenuItem value="Crockery">Crockery</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div>
                                                    <FormControl fullWidth variant="outlined">
                                                        <TextField
                                                            label="Item Description"
                                                            type="text"
                                                            value={itemDesc}
                                                            onChange={handleItemDesc}
                                                            fullWidth
                                                            variant="outlined"
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div>
                                                    <FormControl fullWidth variant="outlined">
                                                        <TextField
                                                            label="Item Value"
                                                            type="text"
                                                            value={itemValue}
                                                            onChange={handleItemValue}
                                                            fullWidth
                                                            variant="outlined"
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div>
                                                    <FormControl fullWidth variant="outlined">
                                                        <Select
                                                            label="Issue Status"
                                                            value={issueStatus}
                                                            onChange={handleIssueStatus}
                                                        >
                                                            <MenuItem value="select">Select</MenuItem>
                                                            <MenuItem value="issued">Yes</MenuItem>
                                                            <MenuItem value="waiting">Waiting</MenuItem>
                                                            <MenuItem value="rejected">No</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div>
                                                    <FormControl fullWidth variant="outlined">
                                                        <Select
                                                            label="Item Make"
                                                            value={itemMake}
                                                            onChange={handleItemMake}
                                                        >
                                                            <MenuItem value="select">Select</MenuItem>
                                                            <MenuItem value="Wood">Wooden</MenuItem>
                                                            <MenuItem value="Glass">Glass</MenuItem>
                                                            <MenuItem value="Plastic">Plastic</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div>
                                                    <Button variant="contained" color="primary" type="submit">
                                                        Edit Details
                                                    </Button>
                                                </div>
                                            </form>
                                        </Box>
                                    </Modal>
                                </div>

                                <div>
                                    <Button variant="contained" color="error" onClick={openModal2}>
                                        Delete Item
                                    </Button>
                                    <Modal
                                        open={isModalOpen2}
                                        onClose={closeModal2}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <form onSubmit={handleDeleteItem}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField
                                                        label="Item Id to delete"
                                                        type="text"
                                                        variant="outlined"
                                                        onChange={handleDeleteItemId}
                                                    />
                                                </FormControl>
                                                <Button variant="contained" color="error" type="submit">Delete Item</Button>
                                            </form>
                                        </Box>
                                    </Modal> </div>
                            </CardContent>
                        </div>
                    ))}
                    <Button variant="contained" color="error" onClick={() => { setUser(null) }}>Logout</Button>
                </CardContent>
            </Card>
        </div>
    );
}
export default AdminItemDataPage;
