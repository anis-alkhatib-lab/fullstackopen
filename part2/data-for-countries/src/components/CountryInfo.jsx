export const CountryInfo = ({ country, weather }) => {
  if (!country || !weather) {
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
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather.main.temp} Celsius</p>
      <p>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
        Wind {weather.wind.speed} m/s
      </p>
    </div>
  );
};

export default CountryInfo;
