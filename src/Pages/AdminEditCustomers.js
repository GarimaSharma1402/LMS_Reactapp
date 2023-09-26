import React, { useContext,useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext} from '../Context/App.context';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './MyStyle.css';

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

const cardStyles = {
    card: {
      width: '300px', // Adjust the card width as needed
      margin: '16px', // Adjust the margin as needed
      border: '1px solid #ccc', // Border styles
      borderRadius: '8px', // Rounded corners
    },
    content: {
      padding: '16px', // Padding within the card content
    },
  };

const AdminEditCustomers = () => {
    const [deleteCustId, setDeleteCustId] = useState('');
    const[Error, setError] = useState(false);
    const [allCustData, setAllCustData] = useState([]);
    const [ename,SetName]=useState("");
    const [id,SetId]=useState("");
    const [dept,SetDept]=useState("");
    const [gender,SetGender]=useState("");
    const [Designation,setDesignation]=useState("");
    const [dob,SetDob]=useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isModalOpen2, setModalOpen2] = useState(false);

    const openModal2 = () => { setModalOpen2(true); }
    const closeModal2 = () => { setModalOpen2(false); }

    //const [doj,SetDoj]=useState("");
    const [customerEditObj,setcustomerEditObj] = useState({employeeId: '',employeeName: '', designation: '', department: '', gender: '', dateOfBirth: ''});
    const [newCustObj, setnewCustObj]= useState({employeeName: '', designation: '', department: '', gender: '', dateOfBirth: ''})
    const handleSubmitEditCustomers = async(event)=>{
        customerEditObj.employeeId = id;
        customerEditObj.employeeName = ename;
        customerEditObj.designation = Designation;
        customerEditObj.department=dept;
        customerEditObj.dateOfBirth = dob;
        //customerEditObj.doj=doj;
        customerEditObj.gender=gender;
        console.log(customerEditObj);
        event.preventDefault();
        try{
        const response=await axios.put('https://localhost:7223/api/AdminCustomerDataManagement?EmployeeID='+id,customerEditObj);
        //alert(response.data);
        }
        catch(error){
            console.error('Error: ',error);
        }
        setIsFormOpen(false);
    }
    const handleId = (event) =>{
        SetId(event.target.value);
    }
    const handleEname = (event)=>{
        SetName(event.target.value);
    };

    const handleDob = (event)=>{
        SetDob(event.target.value);
    };

    const handleDept = (event)=>{
        SetDept(event.target.value);
    };

    const handleGender = (event)=>{
        SetGender(event.target.value);
    };

    const handleDesignation =(event) =>{
        setDesignation(event.target.value);
    };
    const handleEditCust = async(event)=>{
        setIsFormOpen(true);
        
    }

    const handleNewCustomer = async(event)=>{
        newCustObj.employeeName=ename;
        newCustObj.designation=Designation;
        newCustObj.department=dept;
        newCustObj.gender=gender;
        newCustObj.dateOfBirth=dob;
        event.preventDefault();
        try{
            const response=await axios
                .post('https://localhost:7223/api/AdminCustomerDataManagement',
                newCustObj
                )
            
            console.log(response.data);
        }
        catch(error){
            setError(true);
        }
    }

    const handleGetAllCustomers = () => {
        axios
            .get('https://localhost:7223/api/AdminCustomerDataManagement')
            .then((result) => setAllCustData(result.data));
        console.log(allCustData);
    }

    const handleDeleteCustId =(event) => {
        setDeleteCustId(event.target.value);
        console.log(deleteCustId);
    }
    const handleDeleteCustomers = (event) => {
        event.preventDefault();
        axios
            .delete('https://localhost:7223/api/AdminCustomerDataManagement?EmployeeID=' + deleteCustId)
            .then(result => {console.log("deleted successfully")
        })
 
    
    }
    return(
        <center><br></br>
           <h1 className="title">Loan Management Application</h1> <br></br>
           <h3 className="cl1">Customer Master Data Details</h3><br></br><br></br>
           <form className="myForm" onSubmit={handleNewCustomer}>
           <div>
                    Employee Name: &nbsp; <input type="text" value={ename} onChange={handleEname}/> 
                </div><br></br>
                <div>
                Date of Birth:&nbsp;<input type="date" value={dob} onChange={handleDob}/>
                &nbsp;&nbsp;&nbsp;
                    Designation : &nbsp;<select value={Designation} onChange={handleDesignation}>
                                            <option value="select">Select</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Executive">Executive</option>
                                            <option value="Sr.Executive">Sr.Executive</option>
                                            <option value="Clerk">Clerk</option>
                                        </select>
                </div><br></br>

                <div>
                    Department:&nbsp;<select value={dept} onChange={handleDept}>
                                            <option value="select">Select</option>
                                            <option value="Finance">Finance</option>
                                            <option value="HR">HR</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Technology">Technology</option>
                                        </select>&nbsp;&nbsp;
                                        
                </div><br></br>
                <div>
                    Gender : &nbsp;<select value={gender} onChange={handleGender}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                    </select>
                </div><br></br>
                <div>
                    <p><button className="btn1" type="submit">Add Data</button></p>&nbsp;&nbsp;
                 </div>   
           </form>
           <button className='btn1' onClick={handleGetAllCustomers}>Get All Customers</button> &nbsp;&nbsp;
           <div className='card-container'>
           {allCustData.map((allCustData, index) => (
                    <div key={index}>
                        <Card variant="outlined" style={cardStyles.card}>
                            <CardContent style={cardStyles.content}>
                                <Typography variant="h6" component="div">
                                Employee name: {allCustData?.employeeName}
                                
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                Employee ID: {allCustData?.employeeId}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                Designation: {allCustData?.designation}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                Department: {allCustData?.department}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                Gender: {allCustData?.gender}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                Date of Birth: {allCustData?.dateOfBirth}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                Date of Joining: {allCustData?.dateOfJoining}
                                </Typography>
                                <Button className="btn1" onClick={handleEditCust}>Edit Customer</Button>
                                <div>
                                    <Button variant="contained" color="error" onClick={openModal2}>
                                        Delete Customer
                                    </Button>
                                    <Modal
                                        open={isModalOpen2}
                                        onClose={closeModal2}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <form onSubmit={handleDeleteCustomers}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField
                                                        label="Cust Id to delete"
                                                        type="text"
                                                        variant="outlined"
                                                        onChange={handleDeleteCustId}
                                                    />
                                                </FormControl>
                                                
                                                <Button variant="contained" color="error" type="submit">Delete Customer</Button>
                                            </form>
                                        </Box>
                                    </Modal> </div>
                            </CardContent>
                        </Card>
                        <div> 
                             
                            <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
                                <DialogTitle>Edit Customer</DialogTitle>
                                <DialogContent>
                                <form onSubmit={handleSubmitEditCustomers}>
                                <div>
                                    <TextField
                                    label="Employee ID"
                                    type="text"
                                    value={id}
                                    onChange={handleId}
                                    fullWidth
                                    variant="outlined"
                                    />
                                </div>
                                <div>
                                    <TextField
                                    label="Employee Name"
                                    type="text"
                                    value={ename}
                                    onChange={handleEname}
                                    fullWidth
                                    variant="outlined"
                                    />
                                </div>
                                <br />
                                <div style={{ display: 'flex' }}>
                                    <TextField
                                    label="Date of Birth"
                                    type="date"
                                    value={dob}
                                    onChange={handleDob}
                                    variant="outlined"
                                    style={{ flex: 1 }}
                                    />
                                    <FormControl variant="outlined" style={{ flex: 1, marginLeft: '20px' }}>
                                    <InputLabel>Designation</InputLabel>
                                    <Select
                                        label="Designation"
                                        value={Designation}
                                        onChange={handleDesignation}
                                        fullWidth
                                    >
                                        <MenuItem value="select">Select</MenuItem>
                                        <MenuItem value="Manager">Manager</MenuItem>
                                        <MenuItem value="Executive">Executive</MenuItem>
                                        <MenuItem value="Sr.Executive">Sr.Executive</MenuItem>
                                        <MenuItem value="Clerk">Clerk</MenuItem>
                                    </Select>
                                    </FormControl>
                                </div>
                                <br />
                                <div>
                                    <FormControl variant="outlined" style={{ flex: 1 }}>
                                    <InputLabel>Department</InputLabel>
                                    <Select
                                        label="Department"
                                        value={dept}
                                        onChange={handleDept}
                                        fullWidth
                                    >
                                        <MenuItem value="select">Select</MenuItem>
                                        <MenuItem value="Finance">Finance</MenuItem>
                                        <MenuItem value="HR">HR</MenuItem>
                                        <MenuItem value="Sales">Sales</MenuItem>
                                        <MenuItem value="Technology">Technology</MenuItem>
                                    </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" style={{ flex: 1, marginLeft: '20px' }}>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        label="Gender"
                                        value={gender}
                                        onChange={handleGender}
                                        fullWidth
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                    </FormControl>
                                </div>
                                <br />
                                <div>
                                    <Button variant="contained" color="primary" type="submit">
                                    Edit Details
                                    </Button>
                                </div>
                                </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setIsFormOpen(false)} color="secondary">
                                    Close
                                    </Button>
                                </DialogActions>
                            </Dialog>                         
                        </div>
                    </div>
                ))}
                </div>
            <button className='btn1'>Log Out</button>
        </center>
    )
}

export default AdminEditCustomers;
