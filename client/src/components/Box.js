import { Button, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from './Alert'
import alert from './../alert'
import { allUsers } from '../Actions/User'
import { accessChat_ } from '../Actions/Chat'

const Box = ({ open, setOpen, text, confirm, submit, box }) => {
    const dispatch = useDispatch()
    const { users, error } = useSelector(state => state.user)
    const [search, setSearch] = useState('')
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const boxToggle = () => setOpen(!open)
    const accessChat = async id => {
        setOpen(false)
        dispatch(accessChat_(id))
    }
    useEffect(() => {
        const wait = setTimeout(() => {
            dispatch(allUsers(search))
        }, 1200);
        return () => clearTimeout(wait)
    }, [dispatch, search])
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    }, [dispatch, error])
    return (
        <>
            <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
            <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={boxToggle}>
                <DialogTitle>
                    {text}
                </DialogTitle>
                <TextField id='standard-basic' label='Name' variant='outlined' name='name' onChange={e => setSearch(e.target.value)} value={search} sx={{ margin: '0 3vw' }} />
                <div className="users_groups_List">
                    {users && users.map(user => {
                        return (
                            <div key={user._id} onClick={() => accessChat(user._id)} className="users_groups_ListItem">
                                <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                <p className="chatTitle">
                                    {user.name}
                                </p>
                            </div>)
                    }
                    )}
                </div>
                <DialogActions>
                    <Button onClick={boxToggle} color='secondary'>
                        Close
                    </Button>
                    {
                        (box === 2 || box === 5)
                        &&
                        <Button color='primary' onClick={submit}>
                            {confirm}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Box