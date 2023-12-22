import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../../pages/login/login';
import ErrorPage from '../../pages/error/error';
import PrivateRoutes from './privateroutes';
import LicenseView from '../../pages/license/licenseview';
import UtilityView from '../../pages/utility/utilityview';
import ComplianceView from '../../pages/compliance/complianceview';
import Home from '../../pages/home/home';
import Profile from '../../pages/profile/profile';
import Help from '../../pages/help/help';
import Settings from '../../pages/settings/settings';
import LicenseForm from '../../pages/license/licenseform';
import ComplianceForm from '../../pages/compliance/complianceform';
import UtilityForm from '../../pages/utility/utilityform';


function AppRoutes (){
    return (
        <Routes>
            <Route path={'/'} element={<Login/>}></Route>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'*'} element={<ErrorPage/>}></Route>
            <Route element={<PrivateRoutes allowedRoles={['ADMIN', 'USER']}/>}>
                <Route path={'/home'} element={<Home/>}></Route>
                <Route path={'/license'} element={<LicenseView/>}></Route>
                <Route path={'/createLicense'} element={<LicenseForm/>}></Route>
                <Route path={'/compliance'} element={<ComplianceView/>}></Route>
                <Route path={'/createCompliance'} element={<ComplianceForm/>}></Route>
                <Route path={'/costutil'} element={<UtilityView/>}></Route>
                <Route path={'/createCostutil'} element={<UtilityForm/>}></Route>
                <Route path={'/profile'} element={<Profile/>}></Route>
                <Route path={'/help'} element={<Help/>}></Route>
            </Route>
            <Route element={<PrivateRoutes allowedRoles={['ADMIN']}/>}>
                <Route path={'/settings'} element={<Settings/>}></Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;