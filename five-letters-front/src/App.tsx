import './App.css';
import WordSpot from './components/word-spot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          FIVE LETTERS
        </p>
        <WordSpot letters={'Amora'}/>
      </header>
    </div>
  );
}

export default App;
