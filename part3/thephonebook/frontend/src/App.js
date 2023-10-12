import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [successMsg, setSuccessMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    // Get contacts from DB
    useEffect(() => {
        contactService
            .getAllContacts()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const successMsgCreator = (msg) => {
        setSuccessMsg(msg)
        setTimeout(() => {
            setSuccessMsg(null)
        }, 5000)
    }
    const errorMsgCreator = (error) => {
        setErrorMsg(error)
        setTimeout(() => {
            setErrorMsg(null)
        }, 5000)
    }

    // add/update names and numbers
    const addNewPerson = (event) => {
        event.preventDefault()
        const duplicatedPerson = persons.find(person => person.name === newName)
        const duplicatedNumber = persons.find(person => person.number === newNumber)
        if (duplicatedPerson) {
            const updateContact = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (updateContact) {
                const contactIdToUpdate = duplicatedPerson.id
                const updatedContact = { ...duplicatedPerson, number: newNumber }
                const updatedPersons = persons.map(person =>
                    person.id === contactIdToUpdate ? { ...person, number: newNumber } : person)
                
                contactService
                    .updateContact(contactIdToUpdate, updatedContact)
                    .then(() => {
                        successMsgCreator(`${duplicatedPerson.name} successfully updated!`)
                        setPersons(updatedPersons)
                    })
                    .catch(error => {                      
                        errorMsgCreator(`The contact: "${duplicatedPerson.name}" has already been removed from server!`)
                        setPersons(persons.filter(p => p.id !== contactIdToUpdate))
                    })
                
            }
        } else if (duplicatedNumber) {
            alert(`Number ${newNumber} is already added to phonebook`)
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
                id: Math.max(...persons.map(person => person.id), 0) + 1
            }
            contactService
                .createContact(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(newPerson))
                    successMsgCreator(
                        `"${returnedPerson.data.name}" sucessfully added!`
                    )
                }
                )
                .catch(error => {
                    errorMsgCreator(error.response.data.error)
                })
                
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    const handleDelete = (id) => {
        console.log('delete props', id)
        const personToDelete = persons.find(p => p.id === id)
        console.log(personToDelete)
        if (window.confirm(`Do you want to delete?`)) {
            contactService
                .deleteContact(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    successMsgCreator(
                        `"${personToDelete.name}" successfully deleted`
                    )
                }).catch(error => {
                    errorMsgCreator(
                        `Impossible to delete the "${personToDelete.name}" contact`
                    )
                })
        }
    }



    const getFilteredItems = () => {
        if (!search) {
            return persons
        }
        return persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    }
    const filteredItems = getFilteredItems()

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification
                successMsg={successMsg} 
                errorMsg={errorMsg} />
            <Filter
                search={search}
                setSearch={setSearch}
            />
            <h2>add a new</h2>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                addNewPerson={addNewPerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons filteredItems={filteredItems} handleDelete={handleDelete} />
        </div>
    )
}

export default App