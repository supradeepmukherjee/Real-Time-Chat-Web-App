import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterLogin.css'

const RegisterLogin = () => {
    const [login, setLogin] = useState(true)
    const [user, setUser] = useState({})
    const changeHandler = e => setUser({ ...user, [e.target.name]: e.target.value })
    const navigate = useNavigate()
    const registerHandler = async e => {
        e.preventDefault()
        navigate('/welcome')
    }
    const loginHandler = async e => {
        e.preventDefault()
        navigate('/welcome')
    }
    return (
        <>
            <div className='entry'>
                <div className="entryImg">
                    <img src="/icon-512.png" alt="Logo" className='welcomeLogo' />
                </div>
                <div className="entryBox">
                    <p>
                        {login ? 'Login to your Account' : 'Create your Account'}
                    </p>
                    <TextField id='standard-basic' label='Name' variant='outlined' name='name' onChange={changeHandler} />
                    {!login && <TextField id='standard-basic' label='Email' variant='outlined' name='email' onChange={changeHandler} />}
                    <TextField id='outlined-password-input' label='Password' type='password' autoComplete='current-password' name='password' onChange={changeHandler} />
                    <Button variant='outlined' onClick={login ? loginHandler : registerHandler}>
                        Login
                    </Button>
                    <p>
                        {login ? 'Don\'t' : 'Already'} have an account?
                        <span className='hyper' onClick={() => setLogin(!login)}>  {login ? 'Sign Up' : 'Log In'}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default RegisterLogin