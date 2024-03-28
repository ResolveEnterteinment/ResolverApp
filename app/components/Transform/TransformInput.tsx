import { useState } from "react";
import CloseButton from "../General/closeButton";
import style from './transformInput.css';

export function links() {
    return [
        { rel: 'stylesheet', href: style }
    ];
  }

interface TransformInputParams{
    title: string
    positionDisabled?:boolean;
}

export default function TransformInput({title, positionDisabled}: TransformInputParams){

    const [positionState, setPositionState] = useState(false)
    const [rotationState, setRotationState] = useState(false)
    const [scaleState, setScaleState] = useState(false)

    const transformVector = (id:string, stateValue: boolean, stateSetter:React.Dispatch<React.SetStateAction<boolean>>) => {

        const x_name = id + "x";
        const y_name = id + "y";
        const z_name = id + "z";

        return (
            <div key={id}>
                { stateValue ? 
                    (
                        <div> 
                            <div className="transform-vector-title">
                                <h3 className="text">{id}</h3>
                                <CloseButton onClick={() => stateSetter(false)}/>
                            </div>

                            <label className="text">X:</label>
                            <input name={x_name} type='number' defaultValue={0}></input>

                            <label className="text">Y:</label>
                            <input name={y_name} type='number' defaultValue={0}></input>

                            <label className="text">Z:</label>
                            <input name={z_name} type='number' defaultValue={0}></input>
                        </div>
                    ):
                    (
                        <div className="transform-activate-vector-parent">
                            <h3 className="text">{id}</h3>
                            <h2 className="text transform-activate-vector-button" onClick={() => stateSetter(true)}>+</h2>
                        </div>
                    )
                }

            </div>
        );
    };

    return (
        <div className="transform-input-parent">
            <h2 className="transform-input-title text">{title} Transform</h2>
            { !positionDisabled ? transformVector("position", positionState, setPositionState) : null}
            {transformVector("rotation", rotationState, setRotationState)}
            {transformVector("scale", scaleState, setScaleState)}
            
        </div>
    );
}