const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('password required')
    process.exit(1)
} 

const password = process.argv[2]
const cName = process.argv[3]
const cNumber = process.argv[4]

const url = `mongodb+srv://sousaJPR:${password}@cluster0.f2zniuh.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Contact = mongoose.model('Contact', contactSchema)


if (process.argv.length == 3) {
    console.log('')
    console.log('phonebook:')
    Contact.find({}).then(result=> {
        result.forEach(contact => {
            console.log(contact.name, contact.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length == 5) {
    const contact = new Contact ({
        name: cName,
        number: cNumber
    })

    contact.save().then(result => {
        console.log(`added ${contact.name}, number: ${contact.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Error. How to use:')
    console.log('To see the contact list: node mongo.js "password"')
    console.log('To add a new contact: node mongo.js "password" "name" "number')
    console.log('Thank you')
    mongoose.connection.close()
}
