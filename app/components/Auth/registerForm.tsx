import { Form, Link } from "@remix-run/react";
import styles from './auth.css'
import { LinksFunction } from "@remix-run/node";

interface ActionData {
    success:boolean,
    message:string
};

export default function RegisterForm(actionData:ActionData) {

    return (
      <center>
      <div className="register-container">
        { (actionData != null && actionData?.success) ? 
        <h2 className="form-title">You are being redirected to login...</h2>: 
        <>
          <h1 className="form-title">Register</h1>
          {actionData?.success ? actionData?.message && <p className="success-message">{actionData.message}</p> : 
            actionData?.message && <p className="error-message">{actionData.message}</p>}
          <Form method="post" className="register-form">
          <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" id="email" name="email" required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name:</label>
              <input type="text" id="fullName" name="fullName" required className="form-input" placeholder='John Doe'/>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" id="password" name="password" required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required className="form-input" />
            </div>
            <button type="submit" className="submit-button">Register</button>
          </Form>
          <Link to="/login" className="login-link">Already have an account? Log in</Link>
        </> }
      </div>
      </center>
    );
  }

  export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles }
  ];