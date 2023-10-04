const Notification = ({successMsg, errorMsg}) => {
  if (successMsg === null && errorMsg === null) return null
  if (errorMsg) {
    return (
      <div className="error">
          {errorMsg}
      </div>
    )
  } else if (successMsg) {
    return (
      <div className="success">
          {successMsg}
      </div>
    )
  }
}

export default Notification