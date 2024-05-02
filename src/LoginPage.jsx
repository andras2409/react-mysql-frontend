import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import MainMenu from './MainMenu';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Modal } from 'react-bootstrap';

function LoginPage() { 
    
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [employee, setEmployee] = useState('');
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://react-mysql-backend.onrender.com/employees')
        .then(res => res.json())
        .then(data => {
            setUserData(data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }, []);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleLogin = () => {

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        userData.forEach((user) => {
            if (user.username === username && user.password === password) {
                setLoggedIn(true);
                setEmployee(user);
            } else {
                setShowModal(true);
                console.log("login failed");
            }
        });
    }
    
    if (loggedIn === true) {
        return <MainMenu />;
    }

    return (
        <> 
            {
				isLoading ?
				<div className='d-flex flex-column align-items-center justify-content-center vh-100 bg-dark'>
					<ScaleLoader className='mb-5' color='#61BDFB'/>
					<h3 className='text-white'>Database is loading...</h3>
				</div>
				:
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
                    <Modal show={showModal} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Login Failed</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Wrong username or password
                        </Modal.Body>
                    </Modal>
                </>
			}
        </>
    );
}

export default LoginPage