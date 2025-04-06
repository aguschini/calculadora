import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Calculadora = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  // Manejar entrada desde botones virtuales
  const handleButtonClick = (value) => {
    const newInput = input + value;
    setInput(newInput);
    // Mantener el foco en el input
    inputRef.current.focus();
  };

  // Manejar entrada desde teclado físico
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      calcularResultado();
      e.preventDefault();
    } else if (e.key === 'Backspace') {
      setInput(prev => prev.slice(0, -1));
      e.preventDefault();
    }
    // No manejamos otras teclas aquí, las dejará pasar al onChange
  };

  const handleInputChange = (e) => {
    // Filtramos solo los caracteres permitidos
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9+\-*/.÷×]/g, '')
                              .replace(/÷/g, '/')
                              .replace(/×/g, '*');
    setInput(filteredValue);
  };

  const calcularResultado = () => {
    try {
      // eslint-disable-next-line no-eval
      const resultado = eval(input);
      setResult(Number.isFinite(resultado) ? resultado.toString() : 'Error');
    } catch (error) {
      setResult('Error');
    }
  };

  const limpiar = () => {
    setInput('');
    setResult('');
    inputRef.current.focus();
  };

  const borrarUltimo = () => {
    setInput(prev => prev.slice(0, -1));
    inputRef.current.focus();
  };

  return (
    <div className="calculadora">
      <h1>Calculadora</h1>
      <div className="display">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ingrese operación"
        />
        <div className="resultado">{result}</div>
      </div>
      
      <div className="teclado">
        <div className="fila">
          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button onClick={() => handleButtonClick('+')}>+</button>
        </div>
        <div className="fila">
          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button onClick={() => handleButtonClick('-')}>-</button>
        </div>
        <div className="fila">
          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button onClick={() => handleButtonClick('*')}>×</button>
        </div>
        <div className="fila">
          <button onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={() => handleButtonClick('.')}>.</button>
          <button onClick={calcularResultado} className="igual">=</button>
          <button onClick={() => handleButtonClick('/')}>÷</button>
        </div>
        <div className="fila">
          <button onClick={limpiar} className="limpiar">C</button>
          <button onClick={borrarUltimo} className="borrar">⌫</button>
        </div>
      </div>
    </div>
  );
};

export default Calculadora;