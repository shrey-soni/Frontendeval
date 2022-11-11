import './App.css';
import FaqComponent from './frontendeval/FAQ_Component/faq_component';
function reactBoiler() {
  return (<header className="App-header">
    <img src="Octocat.png" className="App-logo" alt="logo" />
    <p>
      GitHub Codespaces <span className="heart">♥️</span> React
    </p>
    <p className="small">
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </p>
  </header>);
}


function App() {
  return (
    <div className="App">
      Hello
      <FaqComponent />
    </div>
  );
}

export default App;
