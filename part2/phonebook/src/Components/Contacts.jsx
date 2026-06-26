const Contacts = ({ contacts }) => {
  return (
    <ul>
      {contacts.map((c) => (
        <li key={c.id}>
          {c.name} {c.number}
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
