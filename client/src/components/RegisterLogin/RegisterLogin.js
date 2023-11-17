import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './RegisterLogin.css'

const RegisterLogin = () => {
    const [login, setLogin] = useState(true)
    const [user, setUser] = useState({})
    const [chavi, setChavi] = useState(null)
    const dispatch = useDispatch()
    const { error, loading, isAuthenticated } = useSelector(state => state.user)
    const changeHandler = e => setUser({ ...user, [e.target.name]: e.target.value })
    const registerHandler = async e => {
        e.preventDefault()
    }
    const loginHandler = async e => {
        e.preventDefault()
        dispatch(loginUser(user.email, user.password))
    }
    return (
        <>
            <div className='entry'>
                <div className="entryImg">
                    <img src="/icon-512.png" alt="Logo" className='welcomeLogo' />
                </div>
                <div className="entryBox">
                    <h1>
                        {login ? 'Login to your Account' : 'Create your Account'}
                    </h1>
                    <form onSubmit={login ? loginHandler : registerHandler}>
                        <TextField id='standard-basic' label='Name' variant='outlined' name='name' onChange={changeHandler} required />
                        {!login && <TextField id='standard-basic' label='Email' variant='outlined' name='email' onChange={changeHandler} required />}
                        <TextField id='outlined-password-input' label='Password' type='password' autoComplete='current-password' name='password' onChange={changeHandler} required />
                        <Button variant='outlined' disabled={loading} type='submit'>
                            {!login ? 'Sign Up' : 'Log In'}
                        </Button>
                    </form>
                    <p>
                        {login ? 'Don\'t' : 'Already'} have an account?
                        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setLogin(!login)}>  {login ? 'Sign Up' : 'Log In'}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default RegisterLogin