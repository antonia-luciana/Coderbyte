import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function ColorSelector() {  
  const initialColor = 'Red';
  let colors = ['Red', 'Blue', 'Green'];
  const [color, setColor] = useState(initialColor);

  return (
    <>
      <select onChange={e => setColor(e.target.value)}>
        {colors.map((color, index) => 
          <option key={index}>{color}</option>)}
      </select>
      <p>You have selected: {color}</p>
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ColorSelector />);