import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false)
  const hiden = { display: visibility ? 'none' : '' }
  const shown = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }
  return (
    <div>
      <div style={hiden}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={shown}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable