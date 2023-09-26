import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
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
import { AppContext } from '../Context/App.context';

function AdminLoanDataPage() {
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

    const [deleteLoanId, setDeleteLoanId] = useState('');
    const [newType, setNewType] = useState('');
    const [newDuration, setNewDuration] = useState('');
    const [newLoanObj, setNewLoanObj] = useState({ loanType: '', durationInYears: '' });
    const [loandata, setloandata] = useState([]);
    const [AllLoanData, setAllLoanData] = useState([]);
    const [cid, setCustid] = useState('');
    const { user, setUser } = useContext(AppContext);
    const [Error, setError] = useState(false);
    const [isModalOpen1, setModalOpen1] = useState(false);
    const [isModalOpen2, setModalOpen2] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [token, setToken] = useState('');
    const [loanEditObj, setloanEditObj] = useState({ loanId: '', loanType: '', durationInYears: '' });
    const [loanId, setLoanId] = useState('');
    const [loanType, setLoanType] = useState('select');
    const [durationInYears, setDurationInYears] = useState('');

    const openModal1 = () => { setModalOpen1(true); }
    const closeModal1 = () => { setModalOpen1(false); }

    const openModal2 = () => { setModalOpen2(true); }
    const closeModal2 = () => { setModalOpen2(false); }

    const handleNewType = (event) => {
        setNewType(event.target.value);
    }

    const handleNewDuration = (event) => {
        setNewDuration(event.target.value);
    }

    const handleNewLoan = async (event) => {
        newLoanObj.loanType = newType;
        newLoanObj.durationInYears = newDuration;
        event.preventDefault();
        try {
            console.log(newLoanObj);
            const response = await axios.post('https://localhost:7223/api/AdminLoanCardManagement/AddLoanCard', newLoanObj);
            console.log(response.data);
        } catch (error) {
            setError(true);
        }
    }

    const handleLoanData = () => {
        axios.get('https://localhost:7223/api/AdminLoanCardManagement/GetAllLoans')
            .then((result) => setAllLoanData(result.data));
    };

    const handleLoanId = (event) => {
        setLoanId(event.target.value);
    }

    const handleLoanType = (event) => {
        setLoanType(event.target.value);
    }

    const handleLoanDuration = (event) => {
        setDurationInYears(event.target.value);
    }

    const handleEditLoan = () => {
        setIsFormOpen(true);
    };

    const handleSubmitEditLoan = async (event) => {
        loanEditObj.loanId = loanId;
        loanEditObj.loanType = loanType;
        loanEditObj.durationInYears = durationInYears;
        event.preventDefault();
        try {
            console.log(loanEditObj);
            const response = await axios.put('https://localhost:7223/api/AdminLoanCardManagement/UpdateLoanCard/' + loanId, loanEditObj);
            alert(response.data);
        } catch (error) {
            setError(true);
        }
        setIsFormOpen(false);
    }

    const handleDeleteLoanId = (event) => {
        setDeleteLoanId(event.target.value);

    }

    const handleDeleteLoan = (event) => {
        event.preventDefault();
        axios.delete('https://localhost:7223/api/AdminLoanCardManagement/DeleteLoanCard/' + deleteLoanId)
            .then(result => {
                console.log("deleted successfully")
            });


    }

    return (
        <div>
            <Card className="text-center m-3">
                <CardContent>
                    <Typography variant="h4">Loan Data Management</Typography>
                    <Typography variant="h5">Add New Loan Data</Typography>
                    <form onSubmit={handleNewLoan}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Loan Type</InputLabel>
                            <Select
                                label="Loan Type"
                                onChange={handleNewType}
                                value={newType}
                            >
                                <MenuItem value="select">Select</MenuItem>
                                <MenuItem value="Furniture">Furniture</MenuItem>
                                <MenuItem value="Stationery">Stationery</MenuItem>
                                <MenuItem value="Crockery">Crockery</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" fullWidth>
                            <TextField
                                label="Loan Duration"
                                type="text"
                                variant="outlined"
                                value={newDuration}
                                onChange={handleNewDuration}
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit">Add New Loan</Button>
                    </form>
                    <br />
                    <Button variant="contained" color="primary" onClick={handleLoanData}>
                        Get Loan data for all Customers
                    </Button>
                    {AllLoanData.map((AllLoanData, index) => (
                        <div key={index} className="card text-center m-3">
                            <CardContent>
                                <Typography variant="body1">Loan ID: {AllLoanData?.loanId}</Typography>
                                <Typography variant="body1">Loan Type: {AllLoanData?.loanType}</Typography>
                                <Typography variant="body1">Loan Duration: {AllLoanData?.durationInYears}</Typography>
                                <div>
                                    <Button variant="contained" color="warning" onClick={openModal1}>
                                        Edit Loan
                                    </Button>
                                    <Modal
                                        open={isModalOpen1}
                                        onClose={closeModal1}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography variant="h6" component="h2">
                                                Edit Loan Details
                                            </Typography>
                                            <form onSubmit={handleSubmitEditLoan}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel>Loan ID:</InputLabel>
                                                    <TextField
                                                        id="outlined-controlled"
                                                        label="Loan Id"
                                                        value={loanId}
                                                        onChange={handleLoanId}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel>Loan Type</InputLabel>
                                                    <Select
                                                        label="Loan Type"
                                                        value={loanType}
                                                        onChange={handleLoanType}
                                                    >
                                                        <MenuItem value="select">Select</MenuItem>
                                                        <MenuItem value="Furniture">Furniture</MenuItem>
                                                        <MenuItem value="Stationery">Stationery</MenuItem>
                                                        <MenuItem value="Crockery">Crockery</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField
                                                        label="Loan Duration"
                                                        type="text"
                                                        variant="outlined"
                                                        value={durationInYears}
                                                        onChange={handleLoanDuration}
                                                    />
                                                </FormControl>
                                                <Button variant="contained" color="primary" type="submit">Edit Details</Button>
                                            </form>
                                        </Box>
                                    </Modal>
                                </div>
                                <div>
                                    <Button variant="contained" color="error" onClick={openModal2}>
                                        Delete Loan
                                    </Button>
                                    <Modal
                                        open={isModalOpen2}
                                        onClose={closeModal2}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                        <form onSubmit={handleDeleteLoan}>
                                            <FormControl variant="outlined" fullWidth>
                                                <TextField
                                                    label="Loan Id to delete"
                                                    type="text"
                                                    variant="outlined"
                                                    onChange={handleDeleteLoanId}
                                                />
                                            </FormControl>
                                            <Button variant="contained" color="error" type="submit">Delete Loan</Button>
                                        </form>
                                        </Box>
                                    </Modal>
                                </div>
                            </CardContent>
                        </div>
                    ))}
                    <Button variant="contained" color="error" onClick={() => { setUser(null) }}>Logout</Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminLoanDataPage;