import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      const evalResult = new Function(`return ${input}`)();
      setResult(evalResult);
      setHistory([...history, `${input} = ${evalResult}`]);
      setInput('');
    } catch {
      setResult('Error');
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="result">{result}</div>
        <div className="input">{input || '0'}</div>
      </div>

      <div className="buttons">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '+'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
        <button className="equals" onClick={handleCalculate}>
          =
        </button>
        <button className="clear" onClick={handleClear}>
          C
        </button>
      </div>
      
      <div className="history">
        <h3>Historial</h3>
        {history.length === 0 ? (
          <p>No hay operaciones previas</p>
        ) : (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        )}
        <button className="clear-history" onClick={clearHistory}>
          Borrar Historial
        </button>
      </div>
    </div>
  );
}

export default App;
