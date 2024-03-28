import constants from "constants.json"
import { Form } from "@remix-run/react";
import style from './sceneSelectionCard.css';

export default function SceneSelectionCard(sceneName:string) 
{
    const words = sceneName.split("_");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }

    return (
        <Form key={sceneName} method="post" id={"scene-select"}>
            <input type="hidden" name={"scene"} value={sceneName} />
            <button className="scene-selection-button" type="submit">
                <h1>{words.join(" ")}</h1>
                <img className="scene-selection-image" src={constants.imageUrl + (sceneName) + ".jpg"} alt={sceneName}/>
            </button>
        </Form>
    );
}

export function links() {
    return [
        { rel: 'stylesheet', href: style }
    ];
  }