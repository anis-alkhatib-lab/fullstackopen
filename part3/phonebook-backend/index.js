require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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
app.get("/info", (_, res) => {
  const date = new Date();
  Contact.countDocuments({}).then((count) => {
    res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `);
  });
});

// GET all persons
app.get("/api/persons", (_, res) => {
  Contact.find({}).then((c) => {
    res.json(c);
  });
});

// GET single person
app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id)
    .then((c) => {
      if (c) {
        res.json(c);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error.message });
    });
});

// DELETE person
app.delete("/api/persons/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error.message });
    });
});

// POST new person
app.post("/api/persons", (req, res) => {
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
    .catch((error) => {
      if (error.code === 11000) {
        return res.status(400).json({
          error: "name must be unique",
        });
      }

      if (error.name === "ValidationError") {
        return res.status(400).json({
          error: error.message,
        });
      }
      res.status(500).json({
        error: "internal server error",
      });
    });
});

const unknownEndpoint = (_, res) => {
  res.status(404).json({
    error: "unknown endpoint",
  });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
