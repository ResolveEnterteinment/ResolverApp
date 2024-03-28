import { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { commitSession, getSession } from '~/utils/session';
import { RedirectToLoginIfUserInvalid } from '~/utils/userUtils';


export async function loader({request}: LoaderFunctionArgs) {

   await RedirectToLoginIfUserInvalid(request.headers);
}

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {  
    
    const session = await getSession(
        request.headers.get("Cookie")
    );

    session.unset("accessToken");
    session.unset("userId");

    throw redirect("/login",{
        headers: {
            "Set-Cookie": await commitSession(session),
        }
    });
};