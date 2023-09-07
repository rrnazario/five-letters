import { createRef } from "react";
import LetterSpot from "../letter-spot";

interface WordSpotProps {
    letters: string
}

export default function WordSpot(props: WordSpotProps) {
    const refences = Array.from(Array(5).keys()).map(i => createRef<HTMLInputElement>());

    const onKeyDown = (kdProp: any) => {
        console.log(kdProp.value);
        if (kdProp.index + 1 < refences.length)
            refences[kdProp.index + 1].current?.focus();
    }

    return <div style={{
        display: 'flex',
        padding: '30px'
    }}>
        {props.letters &&
            props.letters.split('').map((l, index) => {
                return <LetterSpot
                    key={index}
                    index={index}
                    ref={refences[index]}
                    value={l.toUpperCase()}
                    onKeyDown={onKeyDown}
                />
            }
            )}
    </div>
}