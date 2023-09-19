import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { AppContext } from '../Context/App.context';

function AdminLoanDataPage() {
    const [loandata, setloandata] = useState([]);
    const [AllLoanData, setAllLoanData] = useState([]);
    const [cid, setCustid] = useState('');
    const { user, setUser } = useContext(AppContext);
    const[Error, setError] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [token, setToken] = useState('');
    const [loanEditObj,setloanEditObj] = useState({loanId: '', loanType: '', durationInYears: '', loanTypeNavigation: 'null'});
    const[loanId,setLoanId] = useState('');
    const[loanType,setLoanType] = useState('');
    const [durationInYears, setDurationInYears] = useState('');
    const loanTypeNavigation = null;


    const handleCid = (event) => {
        setCustid(event.target.value);
    };

    const handleSubmit = () => {
        setToken(user.token);
        const headers = { Authorization: `Bearer ${user.token}` };
        console.log(headers);
        axios
            .get('https://localhost:7223/api/LoanCard/employee/' + cid)
            .then((response) => setloandata(response.data));
        console.log(loandata);
    };
    const handleLoandata = () => {
        axios
            .get('https://localhost:7223/api/AdminLoanCardManagement')
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
        loanEditObj.loanTypeNavigation = loanTypeNavigation;
        event.preventDefault();
        try{
            const response=await axios
                .put('https://localhost:7223/api/AdminLoanCardManagement/' + loanId,
                loanEditObj
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
                Enter Customer Id:{' '}
                <input type="text" value={cid} onChange={handleCid} />
                <button onClick={handleSubmit}> Fetch Data </button>
                <h1> Loan Details:</h1>
                {loandata.map((loan, index) => (
                    <div key={index}>
                        <div className="card-body">Loan ID: {loan?.loanId}</div>
                        <div className="card-body">Loan Type: {loan?.loanType}</div>
                        <div className="card-body">
                            Loan Duration: {loan?.durationInYears}
                        </div>
                        <div> <Button className="btn1" onClick={handleEditLoan}>Edit Loans</Button> </div>
                        <div> <Button className = "btn1">Delete Loans</Button> </div>
                        <br></br>
                    </div>
                ))}
                <button onClick={handleLoandata}>Get Loan data for all Customers </button> 
                {AllLoanData.map((AllLoanData, index) => (
                    <div key={index}>
                        <div className="card-body">Loan ID: {AllLoanData?.loanId}</div>
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

                        <div> <Button className = "btn1">Delete Loans</Button> </div>
                        <br></br>
                    </div>
                ))}
                <button onClick={() => { setUser(null) }}> Logout </button>
            </div>
        </div>
    );
}
export default AdminLoanDataPage;