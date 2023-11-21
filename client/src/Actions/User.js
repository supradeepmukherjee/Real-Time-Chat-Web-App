import axios from 'axios'

export const registerUser = (name, email, password, chavi) => async dispatch => {
    try {
        dispatch({ type: 'registerRequest' })
        const { data } = await axios.post('/api/user/register', { name, email, password, chavi }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'registerSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'registerFailure',
            payload: err.response.data.msg
        })
    }
}

export const loginUser = (email, password) => async dispatch => {
    try {
        dispatch({ type: 'loginRequest' })
        const { data } = await axios.post('/api/user/login', { email, password }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'loginSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'loginFailure',
            payload: err.response.data.msg
        })
    }
}

export const loadUser = () => async dispatch => {
    try {
        dispatch({ type: 'loadUserRequest' })
        const { data } = await axios.get('/api/user/me')
        dispatch({
            type: 'loadUserSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'loadUserFailure',
            payload: err.response.data.msg
        })
    }
}

export const allUsers = name => async dispatch => {
    try {
        dispatch({ type: 'allUsersRequest' })
        const { data } = await axios.get(`/api/user/users?name=${name}`)
        dispatch({
            type: 'allUsersSuccess',
            payload: data.users
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'allUsersFailure',
            payload: err.response.data.msg
        })
    }
}

export const updateProfile = (name, email, chavi) => async dispatch => {
    try {
        dispatch({ type: 'updateProfileRequest' })
        const { data } = await axios.put('/api/updateprofile', { name, email, chavi }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'updateProfileSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'updateProfileFailure',
            payload: err.response.data.msg
        })
    }
}

export const changePassword = (old, newP, cPass) => async dispatch => {
    try {
        dispatch({ type: 'changePasswordRequest' })
        const { data } = await axios.put('/api/updatepassword', { old, newP, cPass }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'changePasswordSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'changePasswordFailure',
            payload: err.response.data.msg
        })
    }
}

export const forgotPassword = email => async dispatch => {
    try {
        dispatch({ type: 'forgotPasswordRequest' })
        const { data } = await axios.post('/api/forgotpassword', { email }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'forgotPasswordSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'forgotPasswordFailure',
            payload: err.response.data.msg
        })
    }
}

export const resetPassword = (token, password) => async dispatch => {
    try {
        dispatch({ type: 'resetPasswordRequest' })
        const { data } = await axios.put(`/api/resetpassword/${token}`, { password }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'resetPasswordSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'resetPasswordFailure',
            payload: err.response.data.msg
        })
    }
}

export const logout = () => async dispatch => {
    try {
        dispatch({ type: 'logoutRequest' })
        await axios.get('/api/user/logout')
        dispatch({ type: 'logoutSuccess' })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'logoutFailure',
            payload: err.response.data.msg
        })
    }
}