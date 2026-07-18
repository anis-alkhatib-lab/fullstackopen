import { useEffect, useState } from "react";
import Contacts from "./Components/Contacts";
import Filter from "./Components/Filter";
import AddContact from "./Components/AddContact";
import contactService from "./services/contacts";
import Notification from "./Components/Notification";
import Error from "./Components/Error";
import "./index.css";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  const showError = (message) => {
    setNotification(null);
    setError(message);

    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const showNotification = (message) => {
    setError(null);
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => {
        setContacts(initialContacts);
      })
      .catch(() => {
        const message = "Unable to load contacts from the server";
        showError(message);
      });
  }, []);

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

    const matchingName =
      contacts.find((c) => c.number === newNumber)?.name || "Unknown";

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
            setContacts((prev) =>
              prev.map((c) => (c.id === updateResult.id ? updateResult : c)),
            );

            showNotification(
              `${updatedContact.name}'s number was changed to ${updatedContact.number} successfully`,
            );

            setNewName("");
            setNewNumber("");
          })
          .catch((err) => {
            const message = err.response?.data?.error ?? "something went wrong";
            showError(message);
          });
      }
      return;
    }

    if (contacts.some((n) => n.number === newNumber)) {
      alert(
        `${newNumber} is already added to phonebook for contact ${matchingName}`,
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
      .then((contactToAdd) => {
        setContacts((prev) => prev.concat(contactToAdd));

        showNotification(
          `${contactToAdd.name} successfully added to phonebook`,
        );

        setNewName("");
        setNewNumber("");
      })
      .catch((err) => {
        const message = err.response?.data?.error ?? "something went wrong";
        showError(message);
      });
  };

  const deleteContact = (id) => {
    const contactToDelete = contacts.find((c) => c.id === id);

    if (
      window.confirm(
        `Are you sure you want to delete contact: '${contactToDelete?.name}'?`,
      )
    ) {
      contactService
        .remove(id)
        .then(() => {
          setContacts((prev) => prev.filter((c) => c.id !== id));
        })
        .catch(() => {
          const message = `Information of ${contactToDelete.name} has already been removed from server`;
          showError(message);
          setContacts((prev) =>
            prev.filter((c) => c.id !== contactToDelete.id),
          );
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Error message={error} />
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
