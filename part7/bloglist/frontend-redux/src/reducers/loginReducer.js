import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from "./notificationReducer"

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedInUser: null,
        username: '',
        password: ''
    },
    reducers: {
        login(state, action) {
            return {
                loggedInUser: action.payload
            }
        },
        updateUsername(state, action) {
            return {
                ...state,
                username: action.payload
            }
        },
        updatePassword(state, action) {
            return {
                ...state,
                password: action.payload
            }
        },
        logout(state, action) {
            return {
                loggedInUser: null,
                username: '',
                password: ''
            }
        }
    }
})

export const loginUser = (user) => {
    return async dispatch => {
        try {
            const loggedUser = await loginService.login(user)
            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(loggedUser))
            blogService.setToken(loggedUser.token)
            dispatch(setNotification(`Welcome, ${loggedUser.username}`, 'success', 3));
            dispatch(login(loggedUser))
            dispatch(updateUsername(''))
            dispatch(updatePassword(''))
        } catch (error) {
            dispatch(setNotification(`Login failed: '${error.response.data.error}'`, "error", 3));
            dispatch(updateUsername(''))
            dispatch(updatePassword(''))
        }       
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem("loggedBlogAppUser")
        dispatch(setNotification(`Have a nice day!`, "success", 3));
        dispatch(logout())
    }
}

export const setUser = (user) => {
    return dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            blogService.setToken(user.token)
            dispatch(login(user));
        }
    }
}

export const { login, logout, updateUsername, updatePassword, setUsers } = loginSlice.actions
export default loginSlice.reducer