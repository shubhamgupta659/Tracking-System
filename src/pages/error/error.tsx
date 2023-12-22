import React from 'react';
import './errorstyle.css'
import { Button, Result } from 'antd';
import { goToLogin } from '../../api/apiutil';

const ErrorPage =()=>{
    return (
    <div className='main-view-container'>
        <Result 
        className='result-container'
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={(e)=>goToLogin()}>Go To Login</Button>}
  />
    </div>
    );
};

export default ErrorPage;