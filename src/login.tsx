// Import the react JS packages 
import axios from "axios";
import {useState, useEffect} from "react";
import { css } from '@emotion/css';
import { Container, Paper, Input, Button } from '@mantine/core';


export default function Login({authSetter}) {     

    const [username, setUsername] = useState('');     
    const [password, setPassword] = useState('');     // Create the submit method.

    const submit = async e => {    
        // Create request
        e.preventDefault();          
        const user = {
            username: username,
            password: password
        };          // Create the POST requuest
        const {data} = await axios.post(
            'http://localhost:8000/token/', user, {headers: {'Content-Type': 'application/json'}}
        );

        // Initialize the access & refresh token in localstorage.      
        localStorage.clear();         
        localStorage.setItem('access_token', data.access);         
        localStorage.setItem('refresh_token', data.refresh);         
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;     
        authSetter(true);
    }    

    const buttonClass = css`color: white; width: 15rem; margin-bottom: 1rem;`;
    
    return(      
        <div className={css`
        height: 100vh; 
        width: 100vw;

        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#01010a), to(#1d1e30));
        background: -webkit-linear-gradient(top, #01010a, #1d1e30);
        background: -moz-linear-gradient(top, #01010a, #1d1e30);
        background: -ms-linear-gradient(top, #01010a, #1d1e30);
        background: -o-linear-gradient(top, #01010a, #1d1e30);
        background: linear-gradient(top, #01010a, #1d1e30);
         
         font-family: 'Montserrat'`}>
            <Container size="xs" className={css`position: relative; padding: 1rem; padding-top: 10rem`}>
            <Paper shadow="md" radius="xl" withBorder={true} className={
                css`color: white; background-color: rgba(0,0,0,0); padding-top: 4rem; padding-bottom: 4rem;`
            }>
            <form onSubmit={submit} className={css`display: flex; flex-direction: column; justify-content: center; align-items: center;`}>
                <div className={css`margin: 0; font-size: 2.6rem; font-weight:`}>LOGIN</div>
                <div className={css`color: #8c8fa3; margin-bottom: 2rem;`}>Please enter your login and password!</div>
                <div className={css`width: 13rem; margin-bottom: .5rem;`}>Username</div>
                <div className={buttonClass}>
                    <Input 
                        radius='xl'
                        placeholder="Enter Username" 
                        name='username'  
                        type='text' value={username}
                        required 
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className={css`width: 13rem; margin-bottom: .5rem;`}>Password</div>
                <div className={buttonClass}>
                    <Input  
                        radius='xl'
                        name='password' 
                        type="password"     
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className={css`width: 10rem; margin-top: 2rem;`}>
                    <Button variant="outline" color="#10F4FF" radius="xl" type="submit" className={css`height: 3rem; width: 100%;`} >Login</Button>
                </div>
            </form>
            </Paper>
            </Container>
        </div>
    )
}


export function Logout({callback}){
     
    const logout = async e => {        
        try {
            const {data} = await axios.post(
                'http://localhost:8000/logout/',
                {refresh_token:localStorage.getItem('refresh_token')} ,
                {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('access_token'),
                }},  
            );           
            localStorage.clear();  
            callback(false);
        } catch (e) {
            // console.log('logout not working', e)
        }
    };

    return (
        <Button className={css`margin-left: 2rem;`} color="gray" radius="lg" onClick={logout}>Logout</Button>
    )
}
