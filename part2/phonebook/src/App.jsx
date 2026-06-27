import { useEffect, useState } from "react";
import Contacts from "./Components/Contacts";
import Filter from "./Components/Filter";
import AddContact from "./Components/AddContact";
import contacService from "./services/contacts";
import contactService from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    contacService.getAll().then((initialContacts) => {
      setContacts(initialContacts);
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
    ? contacts.filter((n) =>
        n.name.toLowerCase().includes(filter.toLowerCase()),
      )
    : contacts;

  const addContact = (e) => {
    e.preventDefault();

    const getMatchingName = (num) => {
      return contacts.find((n) => n.number === num)?.name || "Unknown";
    };

    if (contacts.some((n) => n.name.toLowerCase() === newName.toLowerCase())) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace old number with the new one?`,
        )
      ) {
        const contactToUpdate = contacts.find(
          (c) => c.name.toLowerCase() === newName.toLowerCase(),
        );
        const updatedContact = { ...contactToUpdate, number: newNumber };
        contactService
          .update(contactToUpdate.id, updatedContact)
          .then((updateResult) => {
            setContacts(
              contacts.map((c) =>
                c.id !== updateResult.id ? updateResult : c,
              ),
            );
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    if (contacts.some((n) => n.number === newNumber)) {
      alert(
        `${newNumber} is already added to phonebook for contact ${getMatchingName(newNumber)}`,
      );
      setNewNumber("");
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    contactService
      .create(nameObject)
      .then((contactToAdd) => setContacts(contacts.concat(contactToAdd)));
    setNewName("");
    setNewNumber("");
  };

  const deleteContact = (id) => {
    const contactToDelete = contacts.find((c) => c.id === id);

    if (
      window.confirm(
        `Are you sure you want to delete contact: '${contactToDelete?.name}'?`,
      )
    ) {
      contactService.remove(id).then(() => {
        setContacts(contacts.filter((c) => c.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={onFilterChange} />
      <AddContact
        onSubmit={addContact}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Contacts</h2>
      <Contacts contacts={contactsToShow} onDelete={deleteContact} />
    </div>
  );
};

export default App;
