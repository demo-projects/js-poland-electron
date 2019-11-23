import { clipboard, ipcRenderer } from 'electron';
import React, { useState, useEffect } from 'react';
import db from './database';

function App() {
  const [snippets, setSnippets] = useState([]);

  const loadSnippets = () => {
    db('snippets')
      .select()
      .then( results => {
        setSnippets(results)
      }); 
  }

  const addSnippet = () => {
    const snippet = clipboard.readText();
    setSnippets(currentSnippets => [...currentSnippets, snippet]);
  }

  const copySnippet = (snippet) => {
    clipboard.writeText(snippet);  
  }

  // code that runs once. like OnInit in Angular
  useEffect(() => {
    // listen to main event
    ipcRenderer.on('snippet-added', addSnippet);
    // loadSnippets()
  },[]);

  return (
    <div className="container">

      <div className="row">
        <h1>SNIPPETS.</h1>
        <button onClick={addSnippet} className="primary small">
          <span className="icon-bookmark" />
          Add code
        </button>
      </div>

      {snippets.map(snippet => (
        <div className="card-fluid">
          <pre>{snippet.content}</pre>
          <button onClick={() => copySnippet(snippet)} className="secondary small">copy</button>
        </div>
      ))}

    </div>
  );
};

export default App;
