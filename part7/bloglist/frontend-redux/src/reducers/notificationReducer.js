import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        success(state, action) {
            console.log('action: ', action)
            return action
        },
        unsuccess(state, action) {
            console.log('action: ', action)
            return action
        },
        clear(state, action) {
            return action
        }
    }
})

export const setNotification = (content, typeOf, time) => {
    return async dispatch => {
        console.log('cheguei ao reducer', content, typeOf, time)
        if (typeOf === 'success') {
            dispatch(success(content, typeOf))
            setTimeout(() => {
                dispatch(clear())
            }, time * 1000)
        } else if (typeOf === 'error') {
            dispatch(unsuccess(content, typeOf))
            setTimeout(() => {
                dispatch(clear())
            }, time * 1000)
        }

    }
}

export const { success, unsuccess, clear } = notificationSlice.actions
export default notificationSlice.reducer