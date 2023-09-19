import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import './MyStyle.css';
//const navigate=useNavigate();
const AdminPortal = () => {
    const navigate=useNavigate();
    const handleClick = async (event) =>
    {
   
    
    navigate('/Adminloandata');
    };


    return(
        <center>
            <h1 className="title">Welcome to Loan Management Application</h1><br></br>
            <h3 className="title">Admin Dashboard</h3><br></br>
            <Stack direction="row" spacing={2}>
                <Button className="btn1">Customer Data Management</Button>
                <Button className="btn1" onClick={handleClick}>Loan Card Management</Button>
                <Button className="btn1">Items Master Data</Button>
            </Stack>
        </center>
    )
}
export default AdminPortal;
