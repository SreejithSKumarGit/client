import React from "react";
import LoginStyles from "../Login/Login.module.css";
import {useNavigate} from "react-router-dom";
import {Input,Button} from "@chakra-ui/react"
export function Login()
{
    const [loginData,setloginData]=React.useState({
        email:"",
        password:""
    })
    const [login,setlogin]=React.useState(false);
     const navigate=useNavigate();
    const handleChange=(e)=>
    {
        let {name,value}=e.target;
        setloginData({...loginData,[name]:value})
    }
    async function handleLogin(e)
    {
        e.preventDefault();

        try {
            const res=await fetch("https://tradify-services-assignment.herokuapp.com/login",{
            method:"POST",
            body:JSON.stringify({
                password:loginData.password,
                email:loginData.email
            }),
            headers:{"Content-type":"Application/json"}

        })
        const data=await res.json();
        if(data.status==="ok")
        {
            localStorage.setItem('token', data.user)
            setlogin(true);
            navigate("/jobs");
        }
        else
        {
            alert(data.message);
        }
        
        } 
        catch (error) {
            console.log(error);
        }
        setloginData({
            email:"",
            password:""
        })
        
    }
    const {email,password}=loginData;
    return(
        <div className={LoginStyles.Container} >
            <div className={LoginStyles.LoginDiv}>
            <h1 style={{fontSize:"30px",fontWeight:"600"}}>Login</h1>
            <form action="" className={LoginStyles.FormBox}>
                <div className={LoginStyles.InputBox}>
                    <label style={{fontSize:"20px",fontWeight:"600"}} htmlFor="">Email</label>
                    <Input 
                        size="lg"
                        
                        type="text"
                        name="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e)=>(handleChange(e))}
                         />
                </div>
                <div className={LoginStyles.InputBox}>
                    <label style={{fontSize:"20px",fontWeight:"600"}} htmlFor="">Password</label>
                    <Input 
                        size="lg"
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e)=>(handleChange(e))}
                         />
                </div>
                <div>
                    <Button colorScheme="blue" size="lg" onClick={(e)=>(handleLogin(e))}>
                        Login
                    </Button>
                </div>
            </form>
                
            </div>
            
        </div>
    )
}