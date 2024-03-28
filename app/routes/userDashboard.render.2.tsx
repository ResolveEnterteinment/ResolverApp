import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import CheckboxInput from "~/components/General/checkboxInput/checkboxInput";
import TransformInput from "~/components/Transform/transformInput";
import { getSession } from "~/utils/session";

import { links as checkboxLinks } from '../components/General/checkboxInput/checkboxInput'
import { links as transformInputLinks } from '../components/Transform/transformInput'

export function links() {
  return [
      ...checkboxLinks(),
      ...transformInputLinks()
  ];
}

type LoaderData = {
	modelName:string;
  };

export async function loader({ request }: LoaderFunctionArgs) 
{	
    const session = await getSession(
      request.headers.get("Cookie")
    );
  
    const modelName = session.get("modelName");
  
    if (modelName == null)
	{
		throw redirect("/userDashboard/render");
	}

    return {modelName};
}

export default function SetTransform()
{
	const loader = useLoaderData<LoaderData>();

  const [autoPlacement, setAutoPlacement] = useState(true)

  return (
    <>
      <h3 className="text">{loader.modelName}</h3>
      <Form method="post">
        <CheckboxInput name="autoPlacement" label="Auto Placement" onChange={(event) => setAutoPlacement(event.target.checked)} 
          defaultState={autoPlacement} info="Your object will be placed to the scene automatically. Recommended."/>
        <TransformInput title="Main" positionDisabled={autoPlacement}/>
        <TransformInput title="Model" />
      </Form>
    </>
  );
}