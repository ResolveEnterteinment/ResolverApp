import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ModelSelectionBox from "~/components/ModelUploadAndSelection/ModelSelectionBox";
import { FetchAllModels, FetchAllModelsResponse, Model } from "~/services/userService";

export async function loader ({ request }: LoaderFunctionArgs) 
{
	const fetchAllModelsResponse = await FetchAllModels();

    return fetchAllModelsResponse;
}

export default function Models()
{
    const fetchAllModelsResponse = useLoaderData<FetchAllModelsResponse>();

    const models = fetchAllModelsResponse.models.map((model) => ModelSelectionBox(model as unknown as Model));

    return (
        <center>
            <h2 className="text">Select Model</h2>
            {models}
        </center>
    );
}
