import './App.css';
import Game from './components/game';

function App() {
  const word = 'Amada';
  return (
    <div className="App">
      <header className="App-header">
        <p>
          FIVE LETTERS
        </p>
        <Game />      
      </header>
    </div>
  );
}

export default App;
