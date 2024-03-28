import { ActionFunction, ActionFunctionArgs, json, redirect } from '@remix-run/node';
import type { LinksFunction } from "@remix-run/node";
import { useActionData } from '@remix-run/react';
import { Login as LoginRequest, LoginResponse } from '~/services/authenticateService';
import { commitSession, getSession } from "~/utils/session";

import LoginForm from '~/components/Auth/loginForm';
import {links as authStyles} from '~/components/Auth/loginForm';

export const links: LinksFunction = () => [
    ...authStyles()
];

interface ActionData {
    success:boolean,
    message:string
};

// Action function to handle form submission
export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const loginResponse:LoginResponse = await LoginRequest(email, password);

  const session = await getSession(
    request.headers.get("Cookie")
  );

  session.set("accessToken", loginResponse.accessToken);
  session.set("userId", loginResponse.userId);
  
  if (!loginResponse.success)
  {
    return json({ success: loginResponse.success, message: loginResponse.message });
  }

  return redirect("/userDashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    }
  });
};

export default function Login() {
    const actionData = useActionData<ActionData>();

    const loginForm = LoginForm(actionData as unknown as ActionData);

    return (
      <div>
        {loginForm}
      </div>
    );
  }