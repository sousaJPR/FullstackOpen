import React from 'react'

const PersonForm = ({ newName, newNumber, addNewPerson, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addNewPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} /> <br />
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
  )
}

export default PersonForm