import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addName = (e) => {
    e.preventDefault();

    const currentMaxId =
      persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

    const getMatchingName = (num) => {
      return persons.find((n) => n.number === num)?.name || "Unknown";
    };

    if (persons.some((n) => n.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (persons.some((n) => n.number === newNumber)) {
      alert(
        `${newNumber} is already added to phonebook for contact ${getMatchingName(newNumber)}`,
      );
      return;
    }

    const nameObject = {
      id: currentMaxId + 1,
      name: newName,
      number: String(newNumber),
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div>
            number:{" "}
            <input
              type="text"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
