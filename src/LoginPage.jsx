import { useState, useEffect } from 'react';
import Button from './components/Button';
import MainMenu from './MainMenu';
import React from 'react';

function LoginPage() { 
    
    const [data, setData] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [employee, setEmployee] = useState('');

    useEffect(() => {
        fetch('http://localhost:8081/employee')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])

    const handleLogin = () => {

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        data.forEach((user) => {
            if (user.username === username && user.password === password) {
                setLoggedIn(true);
                setEmployee(user);
            }
        });
    }
    
    if (loggedIn === true) {
        return <MainMenu />;
    }

    return (
        <> 
            <div id='login-page' className='d-flex justify-content-center align-items-center vh-100 vw-100'>
                <div id='login-container' className='d-flex flex-column justify-content-evenly p-5'>
                    <h1 className='align-self-center display-3 fw-semibold'>Login</h1>
                    <div>
                        <div className="input-group mb-3">
                            <label  className="input-group-text w-25" id="inputGroup-sizing-default">Username</label >
                            <input 
                                id='login-username' 
                                type="text" 
                                className="form-control" 
                            />
                        </div>
                        <div className="input-group">
                            <label  className="input-group-text w-25" id="inputGroup-sizing-default">Password</label >
                            <input 
                                id='login-password' 
                                type="password" 
                                className="form-control" 
                            />
                        </div>
                    </div>
                    <Button onClick={() => handleLogin()} className='btn btn-primary btn-lg w-25 align-self-end'>Login</Button>
                </div>
            </div>   
        </>
    );
}

export default LoginPage