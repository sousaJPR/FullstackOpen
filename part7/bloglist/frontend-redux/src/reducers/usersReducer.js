import { createSlice } from "@reduxjs/toolkit"
import userService from '../services/users'
import { setNotification } from "./notificationReducer"
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        setUserDetails(state, action) {
            console.log('dentro do reducer setUserDetails: ', action.payload)
            return action.payload
        }
    }
})


export const getAllUsers = () => {
    return async dispatch => {
        try {
            const userList = await userService.getAll()
            console.log('userlist no reducer:', userList)
            dispatch(setUsers(userList))
        } catch (error) {
            console.log('error getAllUsers', error)
            dispatch(setNotification('Impossible to load User List', 'error'))
        }
    }
}

export const getUserInfo = (userId) => {
    return async dispatch => {
        try {
            const userInfo = await userService.getUser(userId)
            dispatch(setUserDetails(userInfo))
        } catch (error) {
            console.log('erro no catch do getuserinfo', error)
        }
    }
}

export const { setUsers, setUserDetails } = userSlice.actions
export default userSlice.reducer