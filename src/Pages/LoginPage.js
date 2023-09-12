import{useCallback, useState} from "react";
import axios from 'axios';
import {AppContext} from '../Context/App.context';
import {useNavigate} from 'react-router-dom';
import React from 'react';
const LoginPage = () =>{
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
        const res ={
            email:email,
            custpassword: custpassword
        }
        event.preventDefault();
        // try{
        //     const response=await axios
        //         .post('http://localhost:44361/api/Authorization',
        //         loginobj
        //         )
        //     setUser(response.data);
        //     console.log(response.data);
        //     if(response.data.user_Id==='admin'){
        //         navigate('/profile');
        //     }
        // }
        // catch(error){
        //     setError(error.Message);
        // }
    }
    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Admin Email: </td>
                        <td><input type="email" value={email} id="email" onChange={handleEmail}/></td>
                    </tr>
                    <tr>
                        <td>Admin Password: </td>
                        <td><input type="password" value={custpassword} id="pwd" onChange={handlePwd}/></td>
                    </tr>   
                    <tr>
                        <td><button type="submit" onClick={handleSubmit}>Login as Admin</button></td>
                    </tr>
                        
                </tbody>
            </table>
        </div>
    )
}
export default LoginPage;