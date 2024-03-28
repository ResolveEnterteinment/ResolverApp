import { FC } from "react";

interface CloseButtonParams{
    onClick:() => void;
}

const CloseButton:FC<CloseButtonParams> = ({onClick}: CloseButtonParams) => {

    return (
    <div onClick={onClick}>
        <h3 style={{"color": "#ff0000"}}>X</h3>
    </div>
    );
}

export default CloseButton;