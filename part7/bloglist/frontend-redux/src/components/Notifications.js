import { useSelector } from "react-redux";

const Notifications = () => {
  const notification = useSelector((state) => state.notification.payload)
  const typeOf = useSelector((state) => state.notification.type)
  if (typeOf === 'notification/success') {
    return (
      <div className="success">
        {notification}
      </div>
    )
  } else if (typeOf === 'notification/unsuccess') {
    return (
      <div className="error">
        {notification}
      </div>
    )
  }
  return null
}

export default Notifications;
