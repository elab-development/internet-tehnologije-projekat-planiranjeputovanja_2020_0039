import React, {useState} from 'react';
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

  if(userInput)
  {
    setError('')
  setRandomIndex(Math.round(Math.random() * 20));
  setUserInput('');
  }
  else{
    setError('Unesite pitanje da bi ste saznali odgovor!')
  }
  console.log(randomIndex);
}

const possibleAnswers = [
  'Sigurno je',
  'To je definitivno tako',
  'Bez sumnje',
  'Da definitivno',
  'Možete osloniti na njega',
  'Kako ja to vidim, da',
  'Izgledi dobri',
  'Da',
  'Znaci upućuju na da',
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
    <div className="A">
      <h1>Dobrodošli da pitate Magičnu loptu!</h1>
      <p className="info">Postavite pitanje i dodirnite me za odgovor...</p>
      <input type="text" className="question" value={userInput} onChange={handleChange} />
      <div className="eight-ball">
        <div className="content" onClick={handleClick}>
        {error ? <p className="error">{error}</p> :
          answer ? <p className="answer">{answer}</p> : <p className="eight">start</p>}
          
        </div>
      </div>
    </div>
  );
}

export default EightBall;




