import{useCallback, useState} from "react";
import axios from 'axios';
import {AppContext} from '../Context/App.context';
import {useNavigate} from 'react-router-dom';
import React from 'react';
const RegisterPage = () =>{
    const navigate = useNavigate();
    const[email,setEmail] = useState('');
    const[custpassword,setPwd] = useState('');
    const[Error, setError] = useState(false);
    const handleEmail = (event)=>{
        setEmail(event.target.value);
    }
    const handlePwd = (event) =>{
        setPwd(event.target.value);
    }
    const handleSubmit = async (event) =>{
        
        navigate('/employeeCredentials')
        // const res ={
        //     email:email,
        //     custpassword: custpassword
        // }
        // event.preventDefault();
        // try {

        //     axios
        //         .post('https://localhost:7223/api/Login', res)
        //         //.get('./data.json')
        //         .then((response) => {
        //             console.log(response.data);
        //             const { custpassword, email } = response.data
        //             if (res.email == email && res.custpassword == custpassword) 
        //             {
        //                setError(false); 
                    
        //             }
                    
        //             else {
        //                   setError(true);
        //                  }
        //         });
        // }
        // catch (error) {
        //     setError(error.Message);
        // }
    }
    return(
        <div>
            <h1>Welcome to Loan Management Application</h1>
            <h3>Register here</h3>
            <p>Already Registered? <a href= "http://localhost:3000/login">Login here</a></p>
           <form onSubmit={handleSubmit}>
                <div>
                    Email: <input type="text" value={email} onChange={handleEmail} />
                </div>
                <div>
                    Password: <input type="password" value={custpassword} onChange={handlePwd} />
                </div>
                <div>
                   <a href=""><button type="submit"> Register </button></a> 
                </div>
               {Error && <div>Invalid Details </div>}
            </form> 
        </div>
    )
}
export default RegisterPage;