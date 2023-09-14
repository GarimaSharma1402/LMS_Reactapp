import{useCallback, useState} from "react";
import axios from 'axios';
import {AppContext} from '../Context/App.context';
import {useNavigate} from 'react-router-dom';
import React from 'react';


const EmployeeCredentialFormPage = () =>{

    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        
        navigate('/login')
    }

    return(
        <div>
            
            <h3>Fill up the form to register </h3>
           <form onSubmit={handleSubmit}>
                <div>
                    Employee Name: <input type="text" />
                </div>
                <div>
                    Employee Designation: 
                    <select>
                        <option value="Manager">Manager</option>
                        <option value="Executive">Executive</option>
                        <option value="SExecutive">Sr.Executive</option>
                        <option value="Clerk">Clerk</option>
                    </select>
                </div>
                <div>
                    Employee Department: 
                    <select>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Technology">Technology</option>
                    </select>
                </div>
                <div>
                    Gender: 
                    <select>
                        
                        <option value="female">F</option>
                        <option value="male">M</option>
                    </select>
                </div>
                <div>
                    Date of Birth: <input type="date" />

                </div>
                <div>
                  <button type="submit"> Register and Continue</button>
                </div>
               
            </form> 
        </div>
    )
      
}
export default EmployeeCredentialFormPage