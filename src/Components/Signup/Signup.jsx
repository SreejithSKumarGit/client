import React from "react";
import SignupStyles from "../Signup/Signup.module.css";
import {Input,Button,Select} from "@chakra-ui/react"

export function Signup()
{
    const [formData,setformData]=React.useState({
        name:"",
        email:"",
        password:"",
        
    })
    const handleChange=(e)=>
    {
        let {name,value}=e.target;
        setformData({...formData,[name]:value})
       
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        let data={
            name:formData.name,
            email:formData.email,
            password:formData.password,
            
        }
        fetch("https://tradify-services-assignment.herokuapp.com/register",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{"Content-type":"Application/json"}
        })
        .then((res)=>res.json())
        .then((res)=>
        {
            if(res.status!=="ok")
            {
                alert(res.message);
            }
        })
        setformData({
            name:"",
            email:"",
            password:""
           
        })
    }
    const {name,email,password}=formData;
    return (
        <div className={SignupStyles.Container}>
            <div className={SignupStyles.SignupDiv}>
                <h1 style={{fontSize:"30px",fontWeight:"600"}}>Create an account</h1>
                <div>
                    <form className={SignupStyles.FormBox}>
                        <div className={SignupStyles.InputBox}>
                        <label style={{fontSize:"20px",fontWeight:"600"}} htmlFor="name">Name</label>
                        <Input 
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e)=>(handleChange(e))}
                            placeholder="Enter your name" />
                           
                        </div>
                        <div className={SignupStyles.InputBox}>
                        <label style={{fontSize:"20px",fontWeight:"600"}} htmlFor="">Email</label>
                        <Input 
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e)=>(handleChange(e))}
                            placeholder="Enter your email" />
                           
                        </div>
                        <div className={SignupStyles.InputBox}>
                        <label style={{fontSize:"20px",fontWeight:"600"}} htmlFor="name">Password</label>
                        <Input 
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e)=>(handleChange(e))}
                            placeholder="Enter your password" />
                        
                        </div>
                        <div className={SignupStyles.RegisterBox}>
                        <Button colorScheme="blue" size="lg" onClick={(e)=>(handleSubmit(e))}>
                            Register
                        </Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}