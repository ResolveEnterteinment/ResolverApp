import { ActionFunction, LinksFunction, json, redirect } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { Register as RegisterRequest, RegisterRequestData, RegisterResponse } from '~/services/authenticateService';

import RegisterForm from '~/components/Auth/registerForm';
import {links as authStyles} from '~/components/Auth/registerForm';

export const links: LinksFunction = () => [
    ...authStyles()
];

type ActionData = {
    success:boolean,
    message:string
};

// Action function to handle form submission
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const fullName = formData.get('fullName') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (password != confirmPassword)
  {
      return json({ success: false, message: 'Confirm Password doesn\'t match!' });
  }

  const registerRequest: RegisterRequestData = {
    email: email,
    fullname:fullName,
    password:password
};

  const registerResponse:RegisterResponse = await RegisterRequest(registerRequest);

  if (!registerResponse.success)
  {
    return json({ success: registerResponse.success, message: registerResponse.message });
  }
  else
  {
    return redirect("/login")
  }
  
};

export default function Register() {
    const actionData = useActionData<ActionData>();

    const registerForm = RegisterForm(actionData as unknown as ActionData);

    return (
      <div>
        {registerForm}
      </div>
    );
}