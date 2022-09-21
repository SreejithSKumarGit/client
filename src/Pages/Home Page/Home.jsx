import React from "react";
import { Login } from "../../Components/Login/Login";
import { Navbar } from "../../Components/Navbar/Navbar";
import { Signup } from "../../Components/Signup/Signup";
import HomeStyles from "../Home Page/Home.module.css";



export function Home()
{
    return(
        <>
            <Navbar/>
            <div className={HomeStyles.mainContainer}> 
            <Signup/>
            <Login/>
            </div>
        </>
        
    )
}