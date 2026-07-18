require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const unknownEndpoint = require("./middleware/unknownEndpoint");
const Contact = require("./models/contact");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

// INFO
app.get("/info", (_, res, next) => {
  const date = new Date();
  Contact.countDocuments({})
    .then((count) => {
      res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `);
    })
    .catch(next);
});

// GET all persons
app.get("/api/persons", (_, res, next) => {
  Contact.find({})
    .then((c) => {
      res.json(c);
    })
    .catch(next);
});

// GET single person
app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((c) => {
      if (c) {
        res.json(c);
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

// DELETE person
app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

// POST new person
app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((saved) => {
      res.json(saved);
    })
    .catch(next);
});

// Update existing person
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  const { id } = req.params;

  if (!name || !number) {
    return res.status(400).json({
      error: "name and number are required",
    });
  }

  Contact.findById(id)
    .then((contact) => {
      if (!contact) {
        return res.status(404).end();
      }

      contact.name = name;
      contact.number = number;

      return contact.save();
    })
    .then((saved) => res.json(saved))
    .catch(next);
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
