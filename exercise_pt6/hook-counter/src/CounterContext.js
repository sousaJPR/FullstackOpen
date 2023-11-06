import { createContext, useReducer, useContext } from "react"


const counterReducer = (state, action) => {
    switch (action.type) {
        case 'INC':
            return state + 1
        case 'DEC':
            return state - 1
        case 'ZERO':
            return 0
        default:
            return state
    }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
    const [counter, counterDispatch] = useReducer(counterReducer, 0)
    return (
        <CounterContext.Provider value={[counter, counterDispatch]}>
            {props.children}
        </CounterContext.Provider>
    )
}

export const useCounterValue = () => {
    const countedAndDispatch = useContext(CounterContext)
    return countedAndDispatch[0]
}
export const useCounterDispatch = () => {
    const countedAndDispatch = useContext(CounterContext)
    return countedAndDispatch[1]
}

export default CounterContext