import { useState } from "react";
import Contacts from "./Components/Contacts";
import Filter from "./Components/Filter";
import AddContact from "./Components/AddContact";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("+358");
  const [filter, setFilter] = useState("");

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const onNameChange = (e) => {
    setNewName(e.target.value);
  };

  const onNumberChange = (e) => {
    const value = e.target.value;
    const prefix = "+358";

    if (!value.startsWith(prefix)) {
      setNewNumber(prefix);
    } else {
      setNewNumber(value);
    }
  };

  const contactsToShow = filter
    ? persons.filter((n) => n.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  const addName = (e) => {
    e.preventDefault();

    const phoneNumber = parsePhoneNumberFromString(newNumber, "FI");
    if (!phoneNumber || !phoneNumber.isValid()) {
      alert("Invalid phone number structure");
      setNewNumber("");
      return;
    }

    const formattedValue = phoneNumber.formatInternational();

    const currentMaxId =
      persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

    const getMatchingName = (num) => {
      return persons.find((n) => n.number === num)?.name || "Unknown";
    };

    if (persons.some((n) => n.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }

    if (persons.some((n) => n.number === formattedValue)) {
      alert(
        `${formattedValue} is already added to phonebook for contact ${getMatchingName(newNumber)}`,
      );
      setNewNumber("+358");
      return;
    }

    const nameObject = {
      id: currentMaxId + 1,
      name: newName,
      number: formattedValue,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("+358");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={onFilterChange} />
      <AddContact
        onSubmit={addName}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Contacts</h2>
      <Contacts contacts={contactsToShow} />
    </div>
  );
};

export default App;
