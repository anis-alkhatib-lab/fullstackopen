import { useState } from "react";

const noop = () => {};

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistic = ({ text, value }) => {
  if (text === "positive") {
    return (
      <p>
        {text} {value} %
      </p>
    );
  }
  return (
    <p>
      {text} {value}
    </p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const positive = (good * 100) / all;

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
      <Statistic text={"good"} value={good} />
      <Statistic text={"neutral"} value={neutral} />
      <Statistic text={"bad"} value={bad} />
      <Statistic text={"all"} value={all} />
      <Statistic text={"average"} value={avg} />
      <Statistic text={"positive"} value={positive} />
    </div>
  );
};

export default App;
