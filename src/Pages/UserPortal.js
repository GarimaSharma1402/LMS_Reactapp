import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import './MyStyle.css';
//const navigate=useNavigate();
const UserPortal = () => {
    const navigate=useNavigate();
    const handleClick = async (event) =>
    {
    navigate('/Userloandata');
    };

    const handleItemClick = async (event) =>
    {
    navigate('/Useritemsdata');
    };


    return(
        <center>
            <h1 className="title">Welcome to Loan Management Application</h1><br></br>
            <h3 className="title">Customer Dashboard</h3><br></br>
            <Stack direction="row" spacing={2}>
                <Button className="btn1">View Loans</Button>
                <Button className="btn1" onClick={handleClick}>Apply For Loans</Button>
                <Button className="btn1" onClick={handleItemClick}>View Items Purchased</Button>
            </Stack>
        </center>
    )
}
export default UserPortal;
