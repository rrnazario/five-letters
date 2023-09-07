import './App.css';
import WordSpot from './components/word-spot';

function App() {
  const word = 'Beijo';
  return (
    <div className="App">
      <header className="App-header">
        <p>
          FIVE LETTERS
        </p>
        <WordSpot word={word}/>        
        <WordSpot word={word}/>        
        <WordSpot word={word}/>        
        <WordSpot word={word}/>        
      </header>
    </div>
  );
}

export default App;
