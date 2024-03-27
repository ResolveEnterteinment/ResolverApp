import { ActionFunctionArgs,
	LoaderFunctionArgs,
	unstable_composeUploadHandlers as composeUploadHandlers,
	unstable_parseMultipartFormData as parseMultipartFormData,
	unstable_createFileUploadHandler as createFileUploadHandler,
	UploadHandler,
	redirect
	} from "@remix-run/node";
import { getSession } from "~/utils/session";
import {googleCloudUploadHandler} from "../services/googleCloudService"
import { RedirectToLoginIfUserInvalid, userId } from "~/utils/userUtils";
import DragDropFileUpload from "~/components/ModelUploadAndSelection/DragDropFile";
import { Outlet, useFetcher } from "@remix-run/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FetchAllModelsResponse } from "~/services/userService";

type LoaderData = {
	scene:string;
	userId:string;
	fetchAllModelsResponse:FetchAllModelsResponse;
  };

export async function loader({ request }: LoaderFunctionArgs) 
{	
    const session = await getSession(
      request.headers.get("Cookie")
    );
  
    const scene = session.get("scene");
  
    if (scene == null)
	{
		throw redirect("/userDashboard/render");
	}

  
    return {scene, userId};
}

type ActionData = {
	success:Boolean;
	message:string;
	actionType:string;
	isNameTaken?:boolean;
  };

export async function action ({ request }: ActionFunctionArgs)
{
	await RedirectToLoginIfUserInvalid(request.headers);

	const uploadHandler: UploadHandler = composeUploadHandlers(
		googleCloudUploadHandler,
		createFileUploadHandler(),
	);

	const formData = await parseMultipartFormData(request, uploadHandler);

	const uploadResult = formData.get("fileUpload");

	if (!uploadResult) {
		return {
			success: false,
			message: "Couldn't upload file.",
			actionType: "upload"
		};
	}

	return redirect("models");
};

export default function UploadObject()
{
	const fetcher = useFetcher<ActionData>();

	const [overridingModel, setOverridingModel] = useState(false);
	const [modelNameValid, setModelNameValid] = useState(false);
	const [uploadState, setUploadState] = useState<ReactNode>(null); // State to manage upload status

	const _fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (fetcher.data) 
		{
			if (fetcher.data.success && fetcher.data.actionType == "nameCheck" && !fetcher.data.isNameTaken)
			{
				setModelNameValid(true);
			}
			
			if (fetcher.data.success && fetcher.data.actionType == "upload" )
			{
				setModelNameValid(false);
			}
		}
	}, [fetcher.data]);
	
	useEffect(() => {
		if (fetcher.state !== "idle") {
			setUploadState(
			<h4 className="text">Uploading File..</h4>
			);
		} else if (fetcher.data) {
			setUploadState(<h4 className="text">Status: {fetcher.data.message}</h4>);
		}
	}, [fetcher.state, fetcher.data, overridingModel, modelNameValid]);

	const handleOverrideModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOverridingModel(event.target.checked);
	};

	/*
	<div className="upload-model-override-checkbox">
		<label className='text' htmlFor="overrideModel">Override Existing Model</label>
		<input id="overrideModel" name="overrideModel" type="checkbox" onChange={handleOverrideModelChange}/>
	</div>
	*/

	return (
	  <center>
		<h2 className="text">Upload New Model</h2>
		<fetcher.Form method="post" encType="multipart/form-data">
			<div className="upload-model-form">
				<DragDropFileUpload onFileChange={() => { setModelNameValid(false); }} fileInputRef={_fileInputRef} />
			</div>
			<button className="upload-mode-button" type="submit" >Upload Model</button>
		</fetcher.Form>
		{uploadState}

		<Outlet/>
	  </center>
	);
}