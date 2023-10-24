import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hiden = { display: visible ? 'none' : '' }
  const shown = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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