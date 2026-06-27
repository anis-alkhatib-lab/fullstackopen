const Contacts = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map((c) => (
        <li key={c.id}>
          {c.name} {c.number}
          <button onClick={() => onDelete(c.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
