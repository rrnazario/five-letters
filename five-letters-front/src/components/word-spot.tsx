import { createRef, useState } from "react";
import LetterSpot from "./letter-spot";

interface WordSpotProps {
    word: string
}

export default function WordSpot(props: WordSpotProps) {
    const size = 5;
    const references = Array.from(Array(size).keys()).map(i => createRef<HTMLInputElement>());
    const [currentValues, setCurrentValues] = useState(Array.from(Array(size).keys()).map(i => ' ').reduce((previous, current) => previous += current));

    const onKeyDown = (kdProp: any) => {
        if (kdProp.isEnter) {
            verifyAnswer();
            return;
        }
        const vet = currentValues.split('');

        vet[kdProp.index] = kdProp.value;
        const newValue = vet.join('');
        setCurrentValues(newValue);

        if (kdProp.index + 1 < references.length) {
            const elm = references[kdProp.index + 1].current;
            elm?.focus();
        }
    }

    const verifyAnswer = () => {

        //elm?.style.setProperty('background-color', 'red');
        console.log(`'${currentValues}'`)
        const vet = props.word.toUpperCase().split('');
        let already_visited = Array(5);
        currentValues.split('').forEach((letter, index) => {
            const elm = references[index].current;

            if (vet[index] === letter) {
                elm?.style.setProperty('background-color', 'green');
                already_visited.push(letter);
            }
            else if (vet.indexOf(letter) !== -1 && already_visited.indexOf(letter) === -1) {
                elm?.style.setProperty('background-color', 'yellow');
            }
            else {
                elm?.style.removeProperty('background-color');
            }
        })

        //check if the letters are exactly where they should be

        //check if the letters are valids, but in a wrong position
    }

    return <div style={{
        display: 'flex',
        padding: '30px'
    }}>
        {Array.from(Array(5).keys()).map((_, index) => {
            return <LetterSpot
                key={index}
                index={index}
                ref={references[index]}
                value={''}
                onKeyDown={onKeyDown}
            />
        })}
    </div>
}