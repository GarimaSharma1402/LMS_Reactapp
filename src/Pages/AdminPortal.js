import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
const navigate=useNavigate();
function handleClick(event)
{
    navigate('/LoanDataPage');
}
function AdminPortal  (){
    return(
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}>
            <h1>Welcome to Loan Management Application</h1>
            <h3>Admin Dashboard</h3>
            <Stack direction="row" spacing={2}>
                <Button>View Loans</Button>
                <Button onSubmit={handleClick}>Apply For Loans</Button>
                <Button>View Items Purchased</Button>
            </Stack>
        </div>
    )
}
export default AdminPortal;