import './App.css';
import Game from './components/game';

function App() {
  const word = 'Amada';
  return (
    <div className="App">
      <header className="App-header">
        <p>
          CINCO LETRAS
        </p>
        <Game />      
      </header>
    </div>
  );
}

export default App;
