interface ButtonProps {
    caption: string,
    onClick: () => Promise<void>
}
export default function Button(props: ButtonProps) {
    return <div style={{
        cursor: 'pointer',
        border: '2px solid',
        margin: '5px',
        padding: '5px',
        textAlign: 'center',
        verticalAlign: 'center',
        borderRadius: '10px',
        width: '150px'
    }} onClick={props.onClick}>{props.caption}</div>
}