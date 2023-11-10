import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notifications = () => {
  const notification = useSelector((state) => state.notification.payload)
  const typeOf = useSelector((state) => state.notification.type)
  if (typeOf === 'notification/success') {
    return (
      <Alert variant="success">
        {notification}
      </Alert>
    )
  } else if (typeOf === 'notification/unsuccess') {
    return (
      <Alert variant="danger">
        {notification}
      </Alert>
    )
  }
  return null
}

export default Notifications;
