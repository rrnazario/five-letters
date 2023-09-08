import { useState } from "react";
import WordSpot from "./word-spot";
import raw from '../constants/dict.txt';
import Button from "./button";

export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentWord, setCurrentWord] = useState('');
    const [words, setWords] = useState<string[]>([]);
    const [attempts, setAttempts] = useState<string[]>([]);

    const startGame = async () => {

        await setShowAnswer(false);
        await setCurrentWord('');
        await setAttempts([]);

        //Pick word
        const wordsFetch = await fetch(raw);
        const wordsParsed = await wordsFetch.text();
        const localWords = wordsParsed
            .split('\n')
            .filter(w => w.split('').length === 5)
            .map(w => w.toUpperCase());

        await setWords(localWords);
        const nextIndex = Math.floor(Math.random() * (0 - localWords.length) + localWords.length);
        await setCurrentWord(localWords[nextIndex]);

        await setGameStarted(true);
    }

    const quitGame = async () => {
        await setShowAnswer(true);
        await setGameStarted(false);
    }

    const onAttempt = async (word: string) => {
        if (attempts.indexOf(word) === -1) {
            const local = [...attempts, word];
            await setAttempts(local);
        }
    }

    return <>
        {!gameStarted && <Button onClick={startGame} caption="Jogar" />}
        {gameStarted && <Button onClick={quitGame} caption="Desistir" />}
        {showAnswer && <div>{`A palavra era ${currentWord}`}</div>}
        {gameStarted && <>
            <WordSpot
                word={currentWord}
                dict={words}
                onAttempt={onAttempt}
            />
            <textarea
                cols={25}
                rows={10}
                readOnly
                style={{
                    fontStyle: 'bold',
                    fontSize: '18px',
                    textAlign: 'center'
                }}
                value={attempts.join("\n")} />
        </>}

    </>
}