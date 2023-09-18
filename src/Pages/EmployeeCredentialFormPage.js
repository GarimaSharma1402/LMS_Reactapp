import{useCallback, useState} from "react";
import axios from 'axios';
import {AppContext} from '../Context/App.context';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import './MyStyle.css';

const EmployeeCredentialFormPage = () =>{

    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        
        navigate('/login')
    }

    return(
        <center>
            
            <h3 className="title">Fill up the form to register </h3><br></br>
           <form className="myForm" onSubmit={handleSubmit}>
                <div>
                    Employee Name: <input type="text" />
                </div><br></br>
                <div>
                    Employee Designation:&nbsp;&nbsp; 
                    <select>
                        <option value="Manager">Manager</option>
                        <option value="Executive">Executive</option>
                        <option value="SExecutive">Sr.Executive</option>
                        <option value="Clerk">Clerk</option>
                    </select>
                </div><br></br>
                <div>
                    Employee Department: &nbsp;&nbsp;
                    <select>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Technology">Technology</option>
                    </select>
                </div><br></br>
                <div>
                    Gender: &nbsp;&nbsp;
                    <select>
                        
                        <option value="female">F</option>
                        <option value="male">M</option>
                    </select>
                </div><br></br>
                <div>
                    Date of Birth: &nbsp;<input type="date" />

                </div><br></br>
                <div>
                  <button class="btn1" type="submit"> Register and Continue</button>
                </div>
               
            </form> 
        </center>
    )
      
}
export default EmployeeCredentialFormPage
