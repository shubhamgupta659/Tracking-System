import './loginstyle.css';
import React, { useContext, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from '../../components/footer/footer';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

    async function fetchToken() {
        let data = JSON.stringify({
            "username": "tipsuser@unison.com",
            "password": "tipspassword"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.realm.mongodb.com/api/client/v2.0/app/data-gqwih/auth/providers/local-userpass/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        await axios.request(config)
            .then((response) => {
                localStorage.setItem('access-token',response.data.access_token)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    
    const onFinish = (values: any) => {
        //fetchToken();
        if (values.username === 'user' && values.password === 'password') {
            localStorage.setItem('access',JSON.stringify(['USER']));
            navigate(`/license`);
        } else if (values.username === 'admin' && values.password === 'password') {
            localStorage.setItem('access',JSON.stringify(['ADMIN']));
            navigate(`/license`);
        } else {

        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
        <div className='login-container'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <Footer />
    </>
    );
}

export default Login;