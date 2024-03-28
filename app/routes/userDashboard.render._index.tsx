import { ActionFunctionArgs, LinksFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {GetRenderSceneNames, RenderSceneNamesResponse} from "~/services/renderService"
import SceneSelectionCard from "~/components/SceneSelectionCard/sceneSelectionCard";
import {links as sceneSelectionCardLinks} from "~/components/SceneSelectionCard/sceneSelectionCard";
import { commitSession, getSession } from "~/utils/session";
import { RedirectToLoginIfUserInvalid } from "~/utils/userUtils";

export function links() {
    return [
        ...sceneSelectionCardLinks()
    ];
  }

export async function loader({request}: LoaderFunctionArgs) {
    const data = await GetRenderSceneNames();

    return data;
}

export async function action({request}: ActionFunctionArgs)
{
    try {

        await RedirectToLoginIfUserInvalid(request.headers);

        const formData = await request.formData();
    
        const session = await getSession(
            request.headers.get("Cookie")
        );
        
        session.set("scene", formData.get("scene") as string);
        
        return redirect("/userDashboard/render/1/models", {
            headers: {
            "Set-Cookie": await commitSession(session),
            },
        });
    } catch (error) {
       return error;
    }
        
}

export default function SelectScene() {
    const sceneNames:RenderSceneNamesResponse = useLoaderData<typeof loader>();
    const items = sceneNames.data.map((name) => SceneSelectionCard(name));

    return (
        <div className="wrap">
            {items}
        </div>
    );
  }