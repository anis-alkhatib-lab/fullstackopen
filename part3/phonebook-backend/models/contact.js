const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to:', url)

mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(console.error)

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    minlength: [3, 'name must be at least 3 characters long'],
  },
  number: {
    type: String,
    required: [true, 'number is required'],
    minlength: [8, 'number must be 8 characters long'],
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d+$/.test(value)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
