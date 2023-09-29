const Total = ({parts}) => {
    const total = parts.reduce((prevValue, currentValue) => prevValue + currentValue.exercises, 0)
    return (
      <>
      <p><b>total of {total} exercises</b> </p>
      </>
    )
  }

  export default Total