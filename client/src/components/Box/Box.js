import { Avatar, Button, Dialog, DialogActions, DialogTitle, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../Alert'
import alert from '../../alert'
import { allUsers, logout } from '../../Actions/User'
import { accessChat_, getChats, newGrp } from '../../Actions/Chat'
import { boxClosed, selectBox } from '../../ActionsReducers/Box'
import { Chip, Stack } from '@mui/material';
import './Box.css'

const Box = () => {
    let text, src, otherUser, people, btn
    const dispatch = useDispatch()
    const { users, error, user } = useSelector(state => state.user)
    const { box, open } = useSelector(state => state.box)
    const { chat } = useSelector(state => state.currentChat)
    const { loading, chats, error: chatsError } = useSelector(state => state.chat)
    const [search, setSearch] = useState('')
    const [grpName, setGrpName] = useState('')
    const [alertVisibility, setAlertVisibility] = useState('hidden')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [members, setMembers] = useState([])
    const [membersGrp, setMembersGrp] = useState([])
    const [chavi, setChavi] = useState('https://res.cloudinary.com/dsjluiazl/image/upload/v1700731332/ChatChavi/grp_xaooke.png')
    let filteredUsers = users
    for (let i = 0; i < users?.length; i++) {
        const currentUser = users[i];
        for (let j = 0; j < chats.length; j++) {
            const element = chats[j];
            if (element.name === 'sender') {
                for (let k = 0; k < 2; k++) {
                    if (element.users[k]._id !== user._id) {
                        if (element.users[k]._id !== currentUser._id) {
                            filteredUsers = users.filter(user => user._id === currentUser._id)
                        }
                    }
                }
            }
        }
    }
    if (box === 1) {
        text = 'My Profile'
        src = user.chavi
    }
    else if (box === 2) {
        text = 'Are you sure you want to Log Out?'
        btn = 'Log Out'
    }
    else if (box === 3) {
        text = 'Start a new Chat'
        people = filteredUsers
    }
    else if (box === 4) {
        text = 'Create a new Group'
        people = users
        btn = 'Create'
    }
    else if (box === 5) {
        text = 'Notifications'
    }
    else if (box === 6) {
        if (chat.isGrp) {
            text = `Group: ${chat.name}`
            src = chat.chavi
            people = chat.users
            btn = 'Update'
        } else {
            otherUser = (chat.users[0]._id === user?._id ? chat.users[1] : chat.users[0])
            text = `${otherUser.name}'s Profile`
            src = otherUser.chavi
        }
    }
    const boxToggle = () => open ? dispatch(boxClosed()) : dispatch(selectBox(box))
    const accessChat = async id => {
        dispatch(boxClosed())
        dispatch(accessChat_(id))
        dispatch(getChats(''))
    }
    const chaviHandler = async e => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            if (reader.readyState === 2) setChavi(reader.result)
        }
    }
    const submit = async e => {
        if (box === 2) {
            await dispatch(logout())
            dispatch(boxClosed())
        } else {
            if (grpName === '') {
                return alert('error', setAlertType, 'Group Name can\'t be blank', setAlertMsg, setAlertVisibility, dispatch)
            }
            if (members === []) {
                return alert('error', setAlertType, 'Please select atleast 1 user', setAlertMsg, setAlertVisibility, dispatch)
            }
            alert('info', setAlertType, 'Please Wait', setAlertMsg, setAlertVisibility, dispatch)
            await dispatch(newGrp(grpName, members, chavi))
            dispatch(boxClosed())
        }
    }
    const addHandler = user => {
        if (!members.includes(user)) setMembers([...members, user])
    }
    const personClickHandler = user => {
        if (box === 3) accessChat(user._id)
        else if (box === 6) addHandler(user)
    }
    useEffect(() => {
        if (chat?.isGrp) setMembersGrp(chat?.users)
    }, [chat?.isGrp, chat?.users])
    useEffect(() => {
        const wait = setTimeout(() => {
            dispatch(allUsers(search))
        }, 1200);
        return () => clearTimeout(wait)
    }, [dispatch, search])
    useEffect(() => {
        if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
        if (chatsError) alert('error', setAlertType, chatsError, setAlertMsg, setAlertVisibility, dispatch)
    }, [chatsError, dispatch, error])
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
                            {!chat?.isGrp && <Typography>
                                Name: <b>{box === 1 ? user.name : otherUser.name}</b>
                            </Typography>}
                            {box === 1 &&
                                <Typography>
                                    Email: <b>{user.email}</b>
                                </Typography>}
                        </>}
                </div>
                {(box === 3 || box === 4 || box === 6) &&
                    <>
                        {box === 4 &&
                            <TextField id='standard-basic' label='Name' variant='outlined' name='name' onChange={e => setGrpName(e.target.value)} value={grpName} sx={{ margin: '0 3vw' }} />}
                        {box !== 6 &&
                            <TextField id='standard-basic' label={box === 4 ? 'Search Users' : 'Name'} variant='outlined' name='name' onChange={e => setSearch(e.target.value)} value={search} sx={{ margin: '2vw 3vw' }} />}
                        {(box === 4 || (box === 6 && chat.isGrp && chat.grpAdmin._id === user._id)) &&
                            <Stack direction="row" spacing={1} className='stack'>
                                {(box === 4 ? members : membersGrp).map(member => <Chip
                                    label={member.name}
                                    variant="outlined"
                                    key={member._id}
                                    onDelete={() => {
                                        box === 4 ?
                                            setMembers(members.filter(u => u._id !== member._id))
                                            :
                                            setMembersGrp(members.filter(u => u._id !== member._id))
                                    }} />)}
                            </Stack>
                        }
                        <div className="users_groups_List boxList">
                            {people?.map(user => {
                                return (
                                    <div key={user._id} onClick={() => personClickHandler(user)} className="users_groups_ListItem">
                                        <img src={user.chavi} alt="chavi" className="chatPhoto" />
                                        <p className="chatTitle">
                                            {user.name}
                                        </p>
                                    </div>)
                            }
                            )}
                        </div>
                        {box === 4 &&
                            <div className='registerImg' style={{ textAlign: 'center' }}>
                                <img src={chavi} alt="Chavi Preview" />
                                <input type="file" name='chavi' accept='image/*' onChange={chaviHandler} />
                            </div>}
                    </>}
                <DialogActions>
                    <Button onClick={boxToggle} color='secondary'>
                        Close
                    </Button>
                    {
                        (box === 2 || box === 4 || (box === 6 && chat.isGrp))
                        &&
                        <Button color='primary' onClick={submit}>
                            {btn}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Box