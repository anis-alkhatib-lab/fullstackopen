import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter((item) => {
    return item.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  });

  let content;

  if (loading) {
    content = <div>Loading countries...</div>;
  } else if (error) {
    content = <div>Failed to fetch data</div>;
  } else if (!searchTerm) {
    content = <div>Search for a country name to view results</div>;
  } else if (searchTerm && filteredCountries.length > 10) {
    content = <div>Too many matches, specify another filter</div>;
  } else if (searchTerm && filteredCountries.length === 1) {
    const country = filteredCountries[0];
    content = (
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
  } else {
    content = (
      <ul>
        {filteredCountries.map((item) => (
          <li key={item.name.official}>{item.name.common}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div>
        Find Countries{" "}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Country name.."
        />
      </div>
      <div>{content}</div>
    </div>
  );
};

export default App;
