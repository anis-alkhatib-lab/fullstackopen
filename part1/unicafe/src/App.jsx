import { useState } from "react";

const noop = () => {};

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const ValueStatistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const PercentageStatistic = ({ text, value }) => {
  return (
    <p>
      {text} {value} %
    </p>
  );
};

const Statistics = ({ good, neutral, bad, all, avg, positive }) => {
  if (all === 0) {
    return <p>no feedback given</p>;
  }
  return (
    <>
      <ValueStatistic text={"good"} value={good} />
      <ValueStatistic text={"neutral"} value={neutral} />
      <ValueStatistic text={"bad"} value={bad} />
      <ValueStatistic text={"all"} value={all} />
      <ValueStatistic text={"average"} value={avg} />
      <PercentageStatistic text={"positive"} value={positive} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const avg = all == 0 ? 0 : (good - bad) / all;
  const positive = all == 0 ? 0 : (good * 100) / all;

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };

  return (
    <div>
      <Header text={"give feedback"} />
      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />
      <Header text={"statistics"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg}
        positive={positive}
      />
    </div>
  );
};

export default App;
