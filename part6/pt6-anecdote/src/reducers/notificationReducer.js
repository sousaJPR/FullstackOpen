import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
         notification(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(notification(content))
        setTimeout(() => {
            dispatch(notification(null))
        }, time * 1000 )
}
    }
    

export const { notification } = notificationSlice.actions
export default notificationSlice.reducer