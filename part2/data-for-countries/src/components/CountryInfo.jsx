export const CountryInfo = ({ country }) => {
  if (!country) {
    return null;
  }
  return (
    <div>
      <h1>
        {country.flag}
        {country.name.common}
      </h1>
      <p>
        <strong>Official Name: </strong> {country.name.official}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Area:</strong> {country.area}
      </p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <img src={`${country.flags.png}`} alt={`${country.name.common} flag`} />
    </div>
  );
};

export default CountryInfo;
