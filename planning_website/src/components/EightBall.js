import React, { useState } from 'react';
import '../css/EightBall.css';

function EightBall() {
  const [userInput, setUserInput] = useState('');
  const [randomIndex, setRandomIndex] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setUserInput(event.target.value);
  }

  const handleClick = () => {
    if (userInput) {
      setError('');
      setRandomIndex(Math.round(Math.random() * 20));
      setUserInput('');
    } else {
      setError('Unesite pitanje da biste saznali odgovor!');
    }
    console.log(randomIndex);
  }

  const possibleAnswers = [
    'Sigurno',
    'To je definitivno tako',
    'Bez sumnje',
    'Da, definitivno',
    'Kako ja to vidim, da',
    'Izgledi su dobri',
    'Da',
    'Znaci upućuju na da',
    'Pitaj ponovo kasnije',
    'Bolje da ti sada ne govorim',
    'Ne mogu sada predvideti',
    'Koncentrišite se i pitajte ponovo',
    'Ne računajte na to',
    'Moj odgovor je ne',
    'Moji izvori kažu ne',
    'Najverovatnije',
    'Izgledi nisu tako dobri',
    'Veoma sumnjivo'
  ];
  const answer = possibleAnswers[randomIndex];

  return (
    <div className="eight-ball-container">
      <h1>Dobrodošli!</h1>
      <p className="eight-ball-info">Postavite pitanje i dodirnite za odgovor...</p>
      <input type="text" className="eight-ball-question" value={userInput} onChange={handleChange} />
      <div className="eight-ball-main">
        <div className="eight-ball-content" onClick={handleClick}>
          {error ? <p className="eight-ball-error">{error}</p> :
            answer ? <p className="eight-ball-answer">{answer}</p> : <p className="eight-ball-start">start</p>}
        </div>
      </div>
    </div>
  );
}

export default EightBall;





