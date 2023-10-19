import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hiden = { display: visible ? 'none' : '' }
    const shown = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })
    
    return (
        <div>
            <div style={hiden}>
                <button onClick={toggleVisibility} className="login-button">{props.buttonLabel}</button>
            </div>
            <div style={shown} className="toggle-content">
                {props.children}
                <button onClick={toggleVisibility} className="red-button">Cancel</button>
            </div>
        </div>
    )
})

export default Togglable