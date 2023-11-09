import { useNotificationValue } from "../context/NotificationContext"

const Notifications = () => {
  const notification = useNotificationValue()
  if (notification) return (
    <div className={notification.typeOf}>
      {notification.content}
    </div>
  )
}
export default Notifications