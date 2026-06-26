const Filter = ({ onChange }) => {
  return (
    <div>
      Filter: <input type="text" onChange={onChange} />
    </div>
  );
};

export default Filter;
