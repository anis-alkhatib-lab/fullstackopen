const CountriesList = ({ countries, onClick }) => {
  return (
    <ul>
      {countries.map((item) => (
        <li key={item.name.official}>
          {item.name.common}
          <button type="button" onClick={() => onClick(item)}>
            More info
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
