const AddContact = ({
  onSubmit,
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <div>
      <h2>Add a New Contact</h2>
      <form onSubmit={onSubmit}>
        {" "}
        <div>
          name: <input type="text" value={newName} onChange={onNameChange} />
          <div>
            number:{" "}
            <input type="text" value={newNumber} onChange={onNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">Add Contact</button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
