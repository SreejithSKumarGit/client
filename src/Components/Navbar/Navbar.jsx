import React from "react";
import NavbarStyles from "../Navbar/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import {Button} from "@chakra-ui/react";


export function Navbar()
{
    
    const [isAuth,setisAuth]=React.useState(false);
   
    const navigate=useNavigate();
    async function handleLogout()
    {       
        try {
            
            await localStorage.removeItem("token");
            
            navigate("/");
        } catch (error) {
            console.log(error);
        }      
            
    }
    React.useEffect(()=>
    {
        const token=localStorage.getItem("token");
        
        
        
        if(token)
        {
            setisAuth(true);
        }
    },[])
    return(
        <div className={NavbarStyles.Container}>
            <img src="https://www.pngitem.com/pimgs/m/195-1951323_your-logo-here-png-company-logo-your-logo.png" alt="" />
            <div style={{display:"flex",gap:"15px"}}>
            {isAuth?<> <p></p> <Button  colorScheme="blue" size="lg" onClick={handleLogout}>Logout</Button></>:<></>}
            </div>
            
        </div>
    )
}