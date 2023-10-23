const Notifications = ({ successMsg, errorMsg }) => {
    if (!successMsg && !errorMsg) return null
    if (successMsg && !errorMsg) {
      return (
        <div className="successMsg">{successMsg}</div>
      )
    } else {
      return (
        <div className="errorMsg">{errorMsg}</div>
      )
    }
  }
  export default Notifications