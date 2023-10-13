import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login=()=> {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const Navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if (auth){
            Navigate('/')
        }
    }, [Navigate])
    const handleLogin= async()=>{
        // console.warn(email, password);
        let result=await fetch("http://luckshowindia.com:5000/login", {
            method:'post',
            body:JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (result.ok) {
        const users = await result.json();
        if (users.auth) {
          localStorage.setItem('user', JSON.stringify(users.user));
          localStorage.setItem('token', JSON.stringify(users.auth));
          Navigate('/');
        } else {
          alert('Invalid email or password');
        }
      } else {
        throw new Error('Login failed');
      }
    }
    
  return (
    <div>
        <div className='container'>
            <div className='d-flex justify-content-center'>
                <div className='col-11 col-md-6'>
                    <div className='mt-5'>
                        <h1 className='text-primary'>Login</h1>
                    </div>
                    <form className='mt-5 p-5 bg-dark bg-gradient rounded-4'>
                        <div className="mb-3">
                            <label className="form-label text-white">Email address</label>
                            <input type="email" className="form-control"
                            value={email} onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="form-label text-white">Password</label>
                            <input type="password" className="form-control"  
                             value={password} onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleLogin} type="button" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login