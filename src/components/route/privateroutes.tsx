import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../sidenavbar/navbar';
import { getModules } from '../sidenavbar/getModules';

  
const PrivateRoutes =({allowedRoles}: { allowedRoles: string[] })=>{
    const value = localStorage.getItem('access');
    console.log(value);
    const access = value ? JSON.parse(value) : null;
    const modules = getModules(access);
    return (
    <div>
        {
        access?.find((role : any)=> allowedRoles?.includes(role))
        ? <div><Navbar modules={modules}/><Outlet/></div>
        : <Navigate to="/" />
        }
    </div>
    );
};

export default PrivateRoutes;