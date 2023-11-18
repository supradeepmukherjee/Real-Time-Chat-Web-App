import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../../Actions/User'
import Alert from '../Alert'
import Loader from '../Loader/Loader'
import alert from '../../alert'
import './RegisterLogin.css'

const RegisterLogin = () => {
    const [login, setLogin] = useState(true)
    const [user, setUser] = useState({})
    const [chavi, setChavi] = useState('https://res.cloudinary.com/dsjluiazl/image/upload/v1697892418/EcomChavi/profile_i8jybt.png')
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const dispatch = useDispatch()
    const { error, loading } = useSelector(state => state.user)
    const changeHandler = e => setUser({ ...user, [e.target.name]: e.target.value })
    const chaviHandler = async e => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            if (reader.readyState === 2) setChavi(reader.result)
        }
    }
    const registerHandler = async e => {
        e.preventDefault()
        if (user.name.length < 5) {
            return alert('error', setAlertType, 'Name must be of minimum 5 characters', setAlertMsg, setAlertVisibility, dispatch)
        }
        if (user.password.length < 8) {
            return alert('error', setAlertType, 'Password must be of minimum 8 characters', setAlertMsg, setAlertVisibility, dispatch)
        }
        dispatch(registerUser(user.name, user.email, user.password, chavi))
        alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
    }
    const loginHandler = async e => {
        e.preventDefault()
        dispatch(loginUser(user.email, user.password))
        alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
    }
    useEffect(() => {
        if (error && error !== 'Please login first')
            alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error])
    return (
        <>
            {loading ? <Loader /> : <>
                <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
                <div className='entry'>
                    <div className="entryImg">
                        <img src="/icon-512.png" alt="Logo" className='welcomeLogo' />
                    </div>
                    <div className="entryBox">
                        <h1>
                            {login ? 'Login to your Account' : 'Create your Account'}
                        </h1>
                        <form onSubmit={login ? loginHandler : registerHandler}>
                            {!login && <TextField id='standard-basic' value={user.name} label='Name' variant='outlined' name='name' onChange={changeHandler} required />}
                            <TextField id='standard-basic' value={user.email} label='Email' variant='outlined' name='email' onChange={changeHandler} required />
                            <TextField id='outlined-password-input' value={user.password} label='Password' type='password' autoComplete='current-password' name='password' onChange={changeHandler} required />
                            {!login &&
                                <div className='registerImg'>
                                    <img src={chavi} alt="Chavi Preview" />
                                    <input type="file" name='chavi' accept='image/*' onChange={chaviHandler} />
                                </div>}
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
            </>}
        </>
    )
}

export default RegisterLogin