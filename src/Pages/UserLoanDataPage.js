import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../Context/App.context';

function UserLoanDataPage() {
    const [loandata, setloandata] = useState([]);
    
    const [cid, setCustid] = useState('');
    const { user, setUser } = useContext(AppContext);

    const [token, setToken] = useState('');

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
                        <br></br>
                    </div>
                ))}
                
                <button onClick={() => { setUser(null) }}> Logout </button>
            </div>
        </div>
    );
}
export default UserLoanDataPage;