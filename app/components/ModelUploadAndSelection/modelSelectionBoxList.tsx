import { Model } from "~/services/userService";
import ModelSelectionBox from "./modelSelectionBox";

export default function ModelSelectionBoxList(modelsData:Model[])
{
    const models = modelsData.map((model) => ModelSelectionBox(model as unknown as Model));

    return (
        <div className="existing-model-selection-wrapper">
            {models}
        </div>
    );
}