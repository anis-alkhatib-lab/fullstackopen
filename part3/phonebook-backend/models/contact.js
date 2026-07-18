const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Connecting to:", url);

mongoose
  .connect(url)
  .then(() => console.log("connected to MongoDB"))
  .catch(console.error);

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
    minlength: [3, "name must be at least 3 characters long"],
  },
  number: {
    type: String,
    required: [true, "number is required"],
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
