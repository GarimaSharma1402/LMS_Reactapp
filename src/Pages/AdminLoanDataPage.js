import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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
    const [newType, setNewType]  =useState('');
    const [newDuration, setNewDuration]= useState('');
    const [newLoanObj, setNewLoanObj] = useState({loanType: '', durationInYears: ''});
    const [loandata, setloandata] = useState([]);
    const [AllLoanData, setAllLoanData] = useState([]);
    const [cid, setCustid] = useState('');
    const { user, setUser } = useContext(AppContext);
    const [Error, setError] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [token, setToken] = useState('');
    const [loanEditObj,setloanEditObj] = useState({loanId: '', loanType: '', durationInYears: ''});
    const[loanId,setLoanId] = useState('');
    const[loanType,setLoanType] = useState('');
    const [durationInYears, setDurationInYears] = useState('');
    const loanTypeNavigation = null;
    
    const openModal = () => {setModalOpen(true);}
    const closeModal = () => {setModalOpen(false);}
    
    const handleNewType = (event) =>{
        setNewType(event.target.value);
    }
    const handleNewDuration = (event) =>{
        setNewDuration(event.target.value);
    }
    const handleNewLoan  = async (event) =>{
        newLoanObj.loanType = newType;
        newLoanObj.durationInYears = newDuration;
        event.preventDefault();
        try{
            const response=await axios.post('https://localhost:7223/api/AdminLoanCardManagement/AddLoanCard',newLoanObj)
            console.log(response.data);
        }
        catch(error){
            setError(true);
        }
    }
    
    const handleLoandata = () => {
        axios
            .get('https://localhost:7223/api/AdminLoanCardManagement/GetAllLoans')
            .then((result) => setAllLoanData(result.data));
    };
    const handleLoanId =(event) => {
        setLoanId(event.target.value);
    }
    const handleLoanType =(event) => {
        setLoanType(event.target.value);
    }
    const handleLoanDuration =(event) => {
        setDurationInYears(event.target.value);
    }
    const handleEditLoan = () => {
        setIsFormOpen(true);
    };
    const handleSubmitEditLoan = async(event)=>{
        loanEditObj.loanId = loanId;
        loanEditObj.loanType = loanType;
        loanEditObj.durationInYears = durationInYears;

        event.preventDefault();
        try{
            console.log(loanEditObj);
            const response=await axios
                .put('https://localhost:7223/api/AdminLoanCardManagement/UpdateLoanCard/' + loanId,
                loanEditObj
                )
                alert(response.data);
        }
        catch(error){
            setError(true);
        }
        setIsFormOpen(false);
    }

    const handleDeleteLoanId =(event) => {
        setDeleteLoanId(event.target.value);
    }
    const handleDeleteLoan = () => {
        
        axios
            .delete('https://localhost:7223/api/AdminLoanCardManagement/DeleteLoanCard/' + deleteLoanId)
            .then(result => {console.log("deleted successfully")
        })
    
    }



    return (
        <div>
            <div className="card text-center m-3">
                <h1>Loan Data Management</h1>
                <h3>Add New Loan Data </h3>
                <form onSubmit={handleNewLoan}>
                    <div>
                    Loan Type: 
                        <select onChange={handleNewType}>
                            <option value="select">Select</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Crockery">Crockery</option>
                        </select>
                    </div>
                    <div>
                        Loan Duration: <input type="text" onChange={handleNewDuration} />
                    </div>
                    <div>
                        <button type = "submit"> Add New Loan </button>
                    </div>
                </form>  
                <div>
                    <button onClick={openModal}>
                        Open Modal
                    </button>
                    <Modal
                        open={isModalOpen}
                        onClose={closeModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                        </Box>
                    </Modal>
                </div>

                <br></br>     
                <button onClick={handleLoandata}>Get Loan data for all Customers </button> 
                {AllLoanData.map((AllLoanData, index) => (
                    <div key={index}>
                        <div className="card-body">Loan ID: {AllLoanData?.LoanId}</div>
                        <div className="card-body">Loan Type: {AllLoanData?.loanType}</div>
                        <div className="card-body">
                            Loan Duration: {AllLoanData?.durationInYears}
                        </div>
                        <div> <Button className="btn1" onClick={handleEditLoan}>Edit Loans</Button> 
                            {isFormOpen &&(
                                <form onSubmit={handleSubmitEditLoan}>
                                    <div>
                                        Loan ID: <input type="text" value={loanId} onChange={handleLoanId} />
                                    </div>
                                    <div>
                                        Loan Type: 
                                        <select value={loanType} onChange={handleLoanType}>
                                        <option value="select">Select</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Stationery">Stationery</option>
                                        <option value="Crockery">Crockery</option>
                                        </select>
                                    </div>
                                    <div>
                                        Loan Duration: <input type="text" value={durationInYears} onChange={handleLoanDuration} />
                                    </div>
                                    <div>
                                        <button type = "submit"> Edit Details </button>
                                    </div>
                                </form>
                            )}  
                        </div>
                        <div> 
                            <form onSubmit={handleDeleteLoan}>
                            <div>
                                Loan Id to delete: <input type="text" onChange={handleDeleteLoanId} />
                            </div> 
                            <div><Button className = "btn1" type="submit" >Delete Loans</Button>
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
export default AdminLoanDataPage;