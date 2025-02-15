import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [coefficients, setCoefficients] = useState([]);
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    fetchCoefficients();
  }, []);

  const fetchCoefficients = async () => {
    try {
      const response = await axios.get(
        "https://predictor2js.vercel.app/coefficients"
      );
      console.log(response.data); // Важно! Добавьте это для отладки
      setCoefficients(response.data);

      const newTimers = response.data.map(() => {
        const randomTime = Math.floor(Math.random() * 230) + 59;
        return randomTime;
      });
      setTimers(newTimers);
    } catch (error) {
      console.error("Error fetching coefficients:", error);
    }
  };

  useEffect(() => {
    const countdownIntervals = timers.map((time, index) => {
      return setInterval(() => {
        setTimers((prevTimers) => {
          const newTimers = [...prevTimers];
          if (newTimers[index] > 0) {
            newTimers[index]--;
          }
          return newTimers;
        });
      }, 1000);
    });

    return () => {
      countdownIntervals.forEach(clearInterval);
    };
  }, [timers]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="container">
      <a href="#">
        <img src="img/logo-aviator.svg" alt="Aviator Logo" className="logo" />
      </a>
      <h1>Aviator Signals Online Free App</h1>

      <table id="signalsTable">
        <thead>
          <tr>
            <th>Coefficient</th>
            <th>Time</th>
            <th>Probability</th>
          </tr>
        </thead>
        <tbody>
          {coefficients.map((item, index) => (
            <tr key={index}>
              <td className="coefficient">{item.coefficient}</td>
              <td id={`timer${index}`}>{formatTime(timers[index])}</td>
              <td className="probability">{item.probability}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <a
        href="#"
        className="bonus-button"
        id="updateSignalsButton"
        onClick={fetchCoefficients}
      >
        Get New Signal
      </a>

      <p style={{ fontSize: "1.2em", margin: "20px 0" }}>
        Use our free online app for Aviator signal predictions and reach new
        heights in your betting! With our accurate signals, powered by AI and
        Data Science technologies, you can significantly improve your chances of
        winning. Don’t miss the opportunity to enhance your results with our
        reliable predictor!
      </p>

      <p style={{ fontSize: "1.2em", margin: "20px 0" }}>
        Our advanced technology analyzes all available previous rounds and
        calculates the probabilities of various coefficients within specific
        time frames. By leveraging historical data, we provide you with the most
        accurate predictions in the 1win online casino, allowing you to make
        informed betting decisions. You can also download our APK after
        registering by clicking the button below.
      </p>

      <a href="#" className="motivational-button">
        Get 500% in Aviator
      </a>

      <div className="instructions">
        <h2>How to Use</h2>
        <ol>
          <li>
            <strong>Register at 1win:</strong> First, create an account on 1win
            to access various betting options, including Aviator. Make sure to
            provide accurate details to ensure smooth transactions.
          </li>
          <li>
            <strong>Top up your balance:</strong> After registration, deposit
            funds into your 1win account. This step is essential to participate
            in betting using Aviator signals.
          </li>
          <li>
            <strong>Enable Auto Withdrawal in Aviator:</strong> Activate the
            auto withdrawal feature to ensure that your winnings from the
            Aviator game are automatically transferred to your account after
            each round.
          </li>
          <li>
            <strong>Bet on the current coefficient:</strong> When you see a
            favorable coefficient displayed in the Aviator signals table, place
            your bets accordingly during that period to maximize your potential
            returns.
          </li>
        </ol>
      </div>

      <a href="#" className="instruction-button">
        Instructions in Telegram
      </a>
    </div>
  );
}

export default App;
