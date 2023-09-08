import { RefObject, forwardRef, useState } from "react"

interface LetterSpotProps {
    index?: Number,
    value: string,
    ref: RefObject<HTMLInputElement>,
    onKeyDown: (e: any) => void,
}

type Ref = HTMLInputElement;
export const LetterSpot = forwardRef<Ref, LetterSpotProps>((props, ref) => {

    const [value, setValue] = useState(props.value);
    const onKeyDown = (e: any) => {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const nextValue = e.key.toUpperCase();
            setValue(nextValue);
            props.onKeyDown({ index: props.index, value: nextValue });
        }

        if (e.keyCode === 8 || e.keyCode === 46) {
            setValue('');            
            props.onKeyDown({ isClean: true, index: props.index });
        }

        if (e.keyCode === 13) {
            props.onKeyDown({ isEnter: true });
        }
    }

    return <input
        type="text"
        maxLength={1}
        value={value}
        onKeyDown={onKeyDown}
        ref={ref}
        style={{
            width: '45px',
            height: '45px',
            borderRadius: '8px',
            fontFamily: 'Arial',
            fontSize: '36px',
            textAlign: 'center',
            border: '2px solid'
        }}></input>
});

export default LetterSpot;