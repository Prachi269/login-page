import { Link } from 'react-router-dom'
import validation from './SignupValidation'
import React, { useState } from 'react';

function Signup() {
    const[values,setValues]=useState({
            name:'',
            email:'',
            password:'',
        })
    const [error,setErrors]=useState({})
    const handleInput=(event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.values]}))
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(validation(values));
    }

  return (
   <div className='d-flex justify-content-center align-items-center bg-primary vh-100 '>
        <div className='bg-white p-3 rounded w-25'>
            <h2>SIGNUP</h2>
            <form action ="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" placeholder='Enter Name' name='name' onChange={handleInput} className='form-control rounded-0'/>
                    {error.name && <span className='text-danger'>{error.name}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email'  name='email' onChange={handleInput} className='form-control rounded-0'/>
                    {error.email && <span className='text-danger'>{error.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0'/>
                    {error.password && <span className='text-danger'>{error.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0 bg-green' ><strong>Sign up</strong></button>
                <p>You are agree to our terms and policies </p>
                <Link to ="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none bg-green'><strong>Login</strong></Link>
            </form>

        </div>
    </div>
  )
}

export default Signup