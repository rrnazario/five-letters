import { createRef, useEffect, useState } from "react";
import LetterSpot from "./letter-spot";

interface WordSpotProps {
    word: string,
    dict: string[],
    onAttempt: (word: string) => Promise<void>
}

export default function WordSpot(props: WordSpotProps) {
    const size = 5;
    const references = Array.from(Array(size).keys()).map(_ => createRef<HTMLInputElement>());
    const [currentValues, setCurrentValues] = useState<string>('');
    const [readOnly, setReadOnly] = useState(false);

    useEffect(() => {
        setCurrentValues(Array.from(Array(size).keys()).map(i => ' ').reduce((previous, current) => previous += current));
    }, [props.word]);

    const onKeyDown = async (kdProp: any) => {
        if (kdProp.isEnter) {
            await verifyAnswer();
            return;
        }

        if (kdProp.isClean) {
            const elm = references[kdProp.index].current;
            elm?.style.removeProperty('background-color');
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

    const verifyAnswer = async () => {
        if (!isValid()) {
            alert('Palavra inválida');
            return;
        }

        let wordChars = props.word.toUpperCase().split('');
        let currentValuesChars = currentValues.split('');

        clearColors();

        let result = extractExactMatches(wordChars, currentValuesChars);
        wordChars = result.wordChars;
        currentValuesChars = result.currentValuesChars;

        extractCloseMatches(wordChars, currentValuesChars);

        props.onAttempt(currentValues);
        await setReadOnly(true);
    }

    const clearColors = () => {
        props.word.split('').forEach((_, index) => {
            const elm = references[index].current;
            elm?.style.removeProperty('background-color');
        })
    }

    const isValid = () => {
        const hasEmptySpaces = currentValues.indexOf(' ') !== -1;
        if (hasEmptySpaces) return false;

        if (props.dict.indexOf(currentValues) === -1) return false;

        return true;
    }

    const extractExactMatches = (wordChars: string[], currentValuesChars: string[]): Extractor => {
        let index = 0, elmIndex = 0;
        while (index < currentValuesChars.length && index >= 0) {
            const elm = references[elmIndex].current;

            if (wordChars[index] === currentValuesChars[index]) {
                elm?.style.setProperty('background-color', 'green');

                //remove equal chars
                wordChars.splice(index, 1);
                currentValuesChars.splice(index, 1);
            }
            else {
                index++;
            }

            elmIndex++;
        }

        return { wordChars, currentValuesChars };
    }

    const extractCloseMatches = (wordChars: string[], currentValuesChars: string[]) => {
        let index = 0;
        while (index < wordChars.length && index >= 0) {
            const validIndex = wordChars.indexOf(currentValuesChars[index]);

            if (validIndex !== -1) {

                //find index on the original word and check if the letter is already green
                const originalSentArray = currentValues.toUpperCase().split('');
                let originalIndex = originalSentArray.indexOf(wordChars[validIndex]);
                while (originalIndex !== -1) {
                    const elm = references[originalIndex].current;
                    const color = elm?.style.getPropertyValue('background-color');

                    if (!color) {
                        elm?.style.setProperty('background-color', 'yellow');
                        wordChars.splice(validIndex, 1);
                        break;
                    }

                    originalIndex = originalSentArray.indexOf(wordChars[validIndex], originalIndex + 1);
                }

                currentValuesChars.splice(index, 1);
            }
            else {
                index++;
            }
        }
    }

    return <div style={{
        display: 'flex',
        padding: '10px'
    }}>
        {Array.from(Array(5).keys()).map((_, index) => {
            return <LetterSpot
                key={index}
                index={index}
                ref={references[index]}
                isReadOnly={readOnly}
                value={''}
                onKeyDown={onKeyDown}
            />
        })}
    </div>
}

interface Extractor {
    wordChars: string[],
    currentValuesChars: string[]
}
