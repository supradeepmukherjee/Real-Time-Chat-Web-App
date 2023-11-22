import { Avatar, Button, Dialog, DialogActions, DialogTitle, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../Alert'
import alert from '../../alert'
import { allUsers, logout } from '../../Actions/User'
import { accessChat_, newGrp } from '../../Actions/Chat'
import { boxClosed, selectBox } from '../../Slices/Box'
import { Chip, Stack } from '@mui/material';
import './Box.css'

const Box = () => {
    let text, src, otherUser
    const dispatch = useDispatch()
    const { users, error, user } = useSelector(state => state.user)
    const { box, open } = useSelector(state => state.box)
    const { chat } = useSelector(state => state.currentChat)
    const [search, setSearch] = useState('')
    const [grpName, setGrpName] = useState('')
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [members, setMembers] = useState([])
    if (box === 1) {
        text = 'My Profile'
        src = user.chavi
    }
    else if (box === 2) {
        text = 'Are you sure you want to Log Out?'
    }
    else if (box === 3) {
        text = 'Start a new Chat'
    }
    else if (box === 4) {
        text = 'Create a new Group'
    }
    else if (box === 5) {
        text = 'Notifications'
    }
    else if (box === 6) {
        otherUser = (chat.users[0]._id === user?._id ? chat.users[1] : chat.users[0])
        text = `${otherUser.name}'s Profile`
        src = otherUser.chavi
    }
    const boxToggle = () => open ? dispatch(boxClosed()) : dispatch(selectBox(box))
    const accessChat = async id => {
        dispatch(boxClosed())
        dispatch(accessChat_(id))
    }
    const submit = async e => {
        if (box === 2) {
            await dispatch(logout())
            dispatch(boxClosed())
        } else {
            console.log(members)
            if (grpName === '') {
                return alert('error', setAlertType, 'Group Name can\'t be blank', setAlertMsg, setAlertVisibility, dispatch)
            }
            if (members === []) {
                return alert('error', setAlertType, 'Please select atleast 1 user', setAlertMsg, setAlertVisibility, dispatch)
            }
            alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
            await dispatch(newGrp(grpName, members))
            dispatch(boxClosed())
        }
    }
    const addHandler = user => {
        if (!members.includes(user)) setMembers([...members, user])
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
                <div className={`${(box !== 2) && 'box'}`}>
                    <DialogTitle>
                        {text}
                    </DialogTitle>
                    {(box === 1 || box === 6) &&
                        <>
                            <Avatar src={src} alt='Founder' style={{ width: '20vmax', height: '20vmax' }} />
                            <Typography>
                                Name: <b>{box === 1 ? user.name : otherUser.name}</b>
                            </Typography>
                            {box === 1 &&
                                <Typography>
                                    Email: <b>{user.email}</b>
                                </Typography>}
                        </>}
                </div>
                {(box === 3 || box === 4) &&
                    <>
                        {box === 4 &&
                            <TextField id='standard-basic' label='Name' variant='outlined' name='name' onChange={e => setGrpName(e.target.value)} value={grpName} sx={{ margin: '0 3vw' }} />}
                        <TextField id='standard-basic' label={box === 4 ? 'Search Users' : 'Name'} variant='outlined' name='name' onChange={e => setSearch(e.target.value)} value={search} sx={{ margin: '2vw 3vw' }} />
                        {box === 4 &&
                            <Stack direction="row" spacing={1} className='stack'>
                                {members.map(member => <Chip label={member.name} variant="outlined" key={member._id} onDelete={() => setMembers(members.filter(u => u._id !== member._id))} />)}
                                {members.map(member => <Chip label={member.name} variant="outlined" key={member._id} onDelete={() => setMembers(members.filter(u => u._id !== member._id))} />)}
                                {members.map(member => <Chip label={member.name} variant="outlined" key={member._id} onDelete={() => setMembers(members.filter(u => u._id !== member._id))} />)}
                                {members.map(member => <Chip label={member.name} variant="outlined" key={member._id} onDelete={() => setMembers(members.filter(u => u._id !== member._id))} />)}
                                {members.map(member => <Chip label={member.name} variant="outlined" key={member._id} onDelete={() => setMembers(members.filter(u => u._id !== member._id))} />)}
                                {members.map(member => <Chip label={member.name} variant="outlined" key={member._id} onDelete={() => setMembers(members.filter(u => u._id !== member._id))} />)}
                                {members.map(member => <Chip label={member.name} variant="outlined" key={member._id} onDelete={() => setMembers(members.filter(u => u._id !== member._id))} />)}
                            </Stack>
                        }
                        <div className="users_groups_List boxList">
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                            {users && users.map(user => {
                                return (
                                    <div key={user._id} onClick={() => { box === 3 ? accessChat(user._id) : addHandler(user) }} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                        </div>
                    </>}
                <DialogActions>
                    <Button onClick={boxToggle} color='secondary'>
                        Close
                    </Button>
                    {
                        (box === 2 || box === 4)
                        &&
                        <Button color='primary' onClick={submit}>
                            {box === 2 ? 'Log Out' : 'Create'}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Box