import { Button, TextField } from '@mui/material'
import './Entry.css'

const Entry = () => {
    return (
        <div className='entry'>
            <div className="entryImg">
                <img src="/icon-512.png" alt="Logo" className='welcomeLogo' />
            </div>
            <div className="entryBox">
                <p>
                    Login to your Account
                </p>
                <TextField id='standard-basic' label='Username' variant='outlined' />
                <TextField id='outlined-password-input' label='Password' type='password' autoComplete='current-password' />
                <Button variant='outlined'>
                    Login
                </Button>
            </div>
        </div>
    )
}

export default Entry