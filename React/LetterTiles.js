import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  letterContainer: {
    overflow: 'auto',
    marginBottom: '10px'
  },
  letter: {
    float: 'left',
    padding: '10px 10px',
    background: '#c9e4ed',
    borderRadius: '5px',
    marginRight: '5px',
    cursor: 'pointer',
  },
}

function Tile(props) {
  return (
    <button style={style.letter} onClick={props.action}>{ props.letter }</button>
  );
}

function Application(props) {
  const [outputString, setOutputString] = useState('');

  const handleLetterClick = (letter) => {
    const newOutputString = (outputString + letter).replace(letter+letter+letter, '_');
    setOutputString(newOutputString);
  }

  const letters = Array.from(
    { length: ('Z'.charCodeAt(0) - 'A'.charCodeAt(0)) + 1 }, 
    (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));

  return (
    <section>
      <aside style={style.letterContainer} id="letterContainer">
        {letters.length ? letters.map(letter => <Tile letter={letter} action={() => handleLetterClick(letter)} />): ''}
      </aside>
      <div id="outputString">{outputString}</div>
    </section>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application />);