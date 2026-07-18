const mongoose = require('mongoose')

const argsError = `
Usage:
view contacts: node mongo.js [password]
Add contact: node mongo.js [password] [contact name] [contact phone number]
`

const password = process.argv[2]

const url = `mongodb+srv://anis:${password}@phonebook.0tgx7wt.mongodb.net/contacts?appName=Phonebook`

mongoose.set('strictQuery', false)

const contactSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (!(process.argv.length === 3 || process.argv.length === 5)) {
  console.log(argsError)
  process.exit(1)
}

connectToDb()
  .then(() => {
    if (process.argv.length === 3) {
      return getNames()
    }
    return addName(process.argv[3], process.argv[4])
  })
  .catch(console.error)

function connectToDb() {
  return mongoose.connect(url, { family: 4 })
}

function getNames() {
  return Contact.find({}).then((result) => {
    result.forEach((c) => {
      console.log(c)
    })
    return mongoose.connection.close()
  })
}

function addName(name, number) {
  const contact = new Contact({
    name,
    number,
  })

  return contact.save().then(() => {
    console.log(`contact ${contact.name} ${contact.number} saved!`)
    return mongoose.connection.close()
  })
}
