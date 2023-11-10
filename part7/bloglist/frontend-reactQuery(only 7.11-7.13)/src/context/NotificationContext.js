import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'SET':
            return action.payload            
        case 'CLEAR':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}
export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    const dispatch = notificationAndDispatch[1]

    return (payload, typeOf) => {
        const notificationPayload = {
            content: payload,
            typeOf
        }
        console.log('notificationpayload: ', notificationPayload)
        dispatch({ type: 'SET', payload: notificationPayload })
        setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, 3000)
    }
}

export default NotificationContext