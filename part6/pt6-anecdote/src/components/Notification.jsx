import { useSelector } from "react-redux/es/hooks/useSelector"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginTop: 20
  }

  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return null
}
export default Notification