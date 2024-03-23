import { useFetcher, useSubmit } from "@remix-run/react";
import { useCallback, useRef } from "react";
import { Model } from "~/services/userService";
import { useRouteLoaderData } from "@remix-run/react";

export default function ModelSelectionBox(model:Model)
{
    const fetcher = useFetcher();
    const submit = useSubmit();
    const formRef = useRef<HTMLFormElement>(null)

    const date = new Date( model.createTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();

    const yearText = year.toLocaleString();
    const monthText = month.toLocaleString();
    const dayText = day.toLocaleString();

    const onFileSelect = () => 
    {
        formRef.current?.submit();
    }
    return (
        <div key={model.id} onClick={onFileSelect} className="existing-model-selection">
            <fetcher.Form ref={formRef} method="post" action="selectModel">
                <div className="existing-model-selection-box">
                    <h4 className="text">{model.name}</h4>

                    <div className="date-container">
                        <div className="day">
                            <p className="date-text">DAY</p>
                            <p className="text">{dayText}</p>
                        </div>


                        <div className="month">
                            <p className="date-text">MONTH</p>
                            <p className="text">{monthText}</p>
                        </div>


                        <div className="year">
                            <p className="date-text">YEAR</p>
                            <p className="text">{yearText}</p>
                        </div>
                    </div>
                    

                    
                </div>
                <input type="hidden" name={"modelId"} value={model.id} />
                <input type="hidden" name={"modelName"} value={model.name} />
            </fetcher.Form>
        </div>);
}