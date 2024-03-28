import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import RenderSteps from "~/components/RenderSteps/renderSteps";
import { RedirectToLoginIfUserInvalid } from "~/utils/userUtils";
import {links as renderStepsStyles} from '../components/RenderSteps/renderSteps'

export const links: LinksFunction = () => [
    ...renderStepsStyles()
  ];

 export async function loader({request}: LoaderFunctionArgs) {
    
    await RedirectToLoginIfUserInvalid(request.headers);

    return {};
}

export default function Render() {

    const titles = [
        "Select Scene",
        "Select Model",
        "Set Transform",
        "Other Objects",
        "Render Configs",
        "Confirm"
    ]

    const renderSteps = RenderSteps({titles});

    return(
        <div>
            {renderSteps}
            <Outlet/>
        </div>
    );
}