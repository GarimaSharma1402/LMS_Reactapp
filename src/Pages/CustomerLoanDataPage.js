import React, { useContext,useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext} from '../Context/App.context';
import './MyStyle.css';

const CustomerLoanDataPage = () => {
    const [ename,SetName]=useState("");
    const [id,SetId]=useState("");
    const [dept,SetDept]=useState("");
    const [gender,SetGender]=useState("");
    const [Designation,setDesignation]=useState("");
    const [dob,SetDob]=useState("");
    const [doj,SetDoj]=useState("");
    const [loanEditObj,setloanEditObj] = useState({id: '', ename: '', Designation: '', dept: '',dob: '',doj: '',gender: ''});

    const handleEid = (event)=>{
        SetId(event.target.value);
    };

    const handleEname = (event)=>{
        SetName(event.target.value);
    };

    const handleDob = (event)=>{
        SetDob(event.target.value);
    };

    const handleDept = (event)=>{
        SetDept(event.target.value);
    };

    const handleDoj = (event)=>{
        SetDoj(event.target.value);
    };

    const handleGender = (event)=>{
        SetGender(event.target.value);
    };

    const handleDesignation =(event) =>{
        setDesignation(event.target.value);
    };
    const handleSubmit = async(event)=>{
        loanEditObj.id = id;
        loanEditObj.ename = ename;
        loanEditObj.Designation = Designation;
        loanEditObj.dept=dept;
        loanEditObj.dob = dob;
        loanEditObj.doj=doj;
        loanEditObj.gender=gender;
        event.preventDefault();
        try{
        const response=await axios.put('https://localhost:7223/api/AdminCustomerDataManagement/'+id,loanEditObj);
        alert(response.data);
        }
        catch(error){
            console.error('Error: ',error);
        }
    }
    return(
        <center><br></br>
           <h1 className="title">Loan Management Application</h1> <br></br>
           <h3 className="cl1">Customer Master Data Details</h3><br></br><br></br>
           <form className="myForm">
                <div>
                    Employee Id:&nbsp; <input type="text" value={id} onChange={handleEid}/>
                    &nbsp;&nbsp;&nbsp;
                    Designation : &nbsp;<select value={Designation} onChange={handleDesignation}>
                                            <option value="Manager">Manager</option>
                                            <option value="Executive">Executive</option>
                                            <option value="Sr.Executive">Sr.Executive</option>
                                            <option value="Clerk">Clerk</option>
                                        </select>
                </div><br></br>
                <div>
                    Employee Name: &nbsp; <input type="text" value={ename} onChange={handleEname}/>
                    &nbsp;&nbsp;&nbsp;
                    Date of Birth:&nbsp;<input type="date" value={dob} onChange={handleDob}/>
                </div><br></br>
                <div>
                    Department:&nbsp;<select value={dept} onChange={handleDept}>
                                            <option value="Finance">Finance</option>
                                            <option value="HR">HR</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Technology">Technology</option>
                                        </select>&nbsp;&nbsp;
                    Date of Joining:&nbsp;<input type="date" value={doj} onChange={handleDoj}/>                    
                </div><br></br>
                <div>
                    Gender : &nbsp;<select value={gender} onChange={handleGender}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                    </select>
                </div><br></br>
                <div>
                    <p><button className="btn1" onClick={handleSubmit}>Add Data</button>&nbsp;&nbsp;
                    <button className='btn1'>Get All Customers</button> &nbsp;&nbsp;
                    <button className='btn1'>Log Out</button></p>
                 </div>   
           </form>
        </center>
    )
}

export default CustomerLoanDataPage;