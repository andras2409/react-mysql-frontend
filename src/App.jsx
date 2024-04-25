import React, { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import "./App.css";
import ScaleLoader from 'react-spinners/ScaleLoader'

function App() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // Initialize loading state to true

    useEffect(() => {
        // As fetch begins, isLoading is true
        fetch('https://react-mysql-backend.onrender.com/employees')
        .then(res => res.json())
        .then(data => {
            setUserData(data);
			setTimeout(2500);
            setIsLoading(false);  // Set loading to false once data is fetched
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);  // Also set loading to false on error
        });
    }, []);

    // Optional: Log userData when it changes
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    // Render the login page once data is loaded
    return (
        <>
			{
				isLoading ?
				<div className='d-flex flex-column align-items-center justify-content-center vh-100 bg-dark'>
					<ScaleLoader className='mb-5' color='#61BDFB'/>
					<h3 className='text-white'>Database is loading...</h3>
				</div>
				:
				<LoginPage userData={userData} />
			}
		</>
    );
}

export default App;
