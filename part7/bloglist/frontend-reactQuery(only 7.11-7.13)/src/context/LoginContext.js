import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react"
import blogService from '../services/blogs'

const LoginContext = createContext()

const loginReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload 
                }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}




export const LoginContextProvider = (props) => {
    const [loginState, dispatch] = useReducer(loginReducer, { isAuthenticated: false, user: null})

    const login = (user) => {
        dispatch({ type: 'LOGIN', payload: user})
    }
    const logout = (user) => {
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          blogService.setToken(user.token)
          console.log('user', user)
          dispatch({ type: 'LOGIN', payload: user})
        }
      }, [])
      
    return (
        <LoginContext.Provider value={{loginState, login, logout}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => {
    const context = useContext(LoginContext)
    if (!context) {
        throw new Error('useLogin must be used inside LoginContextProvider')
    }
    return context
}
export default LoginContext