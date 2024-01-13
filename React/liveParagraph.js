import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function LiveText() {
  const [text, setText] = useState('');

  return (
    <>
      <input type="text" onChange={e => setText(e.target.value)}/>
      <p>{text}</p>
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<LiveText />);