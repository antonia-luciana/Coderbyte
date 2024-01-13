import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Counter() {
  let [count, setCount] = useState(0);

  return (
    <div id="mainArea">
      <p>button count: <span>{count}</span></p>
      <button id="mainButton" onClick={() => setCount(count+1)}>increase</button>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Counter />);