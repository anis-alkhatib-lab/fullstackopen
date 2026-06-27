import { useEffect, useState } from "react";
import Contacts from "./Components/Contacts";
import Filter from "./Components/Filter";
import AddContact from "./Components/AddContact";
import axios from "axios";

const DB_URL = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    axios.get(DB_URL).then((response) => {
      setPersons(response.data);
    });
  });

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const onNameChange = (e) => {
    setNewName(e.target.value);
  };

  const onNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const contactsToShow = filter
    ? persons.filter((n) => n.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  const addName = (e) => {
    e.preventDefault();

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
        `${newNumber} is already added to phonebook for contact ${getMatchingName(newNumber)}`,
      );
      setNewNumber("");
      return;
    }

    const nameObject = {
      id: currentMaxId + 1,
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
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
