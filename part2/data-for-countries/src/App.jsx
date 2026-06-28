import { useEffect, useState } from "react";

import CountryInfo from "./components/CountryInfo";
import CountriesList from "./components/CountriesList";
import countryService from "./services/countries";

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries);
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

  useEffect(() => {
    setSelectedCountry(null);
  }, [searchTerm]);

  const activeCountry =
    selectedCountry ||
    (filteredCountries.length === 1 ? filteredCountries[0] : null);

  let content;

  const handleMoreInfo = (value) => {
    setSelectedCountry(value);
  };

  if (loading) {
    content = <div>Loading countries...</div>;
  } else if (error) {
    content = <div>Failed to fetch data</div>;
  } else if (!searchTerm) {
    content = <div>Search for a country name to view results</div>;
  } else if (searchTerm && filteredCountries.length > 10) {
    content = <div>Too many matches, specify another filter</div>;
  } else if (activeCountry) {
    content = <CountryInfo country={activeCountry} />;
  } else {
    content = (
      <CountriesList countries={filteredCountries} onClick={handleMoreInfo} />
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
