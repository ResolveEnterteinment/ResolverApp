import { Form, Link } from "@remix-run/react";
import styles from './auth.css'
import { LinksFunction } from "@remix-run/node";

interface ActionData {
    success:boolean,
    message:string
};

export default function LoginForm(actionData:ActionData) {

    return (
      <center>
      <div className="register-container">
        <h1 className="form-title">Login</h1>
        {actionData?.success ? actionData?.message && <p className="success-message">{actionData.message}</p> : 
          actionData?.message && <p className="error-message">{actionData.message}</p>}
        <Form method="post" className="register-form">
        <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" id="email" name="email" required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" id="password" name="password" required className="form-input" />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </Form>
        <Link to="/register" className="login-link">Don't have an account? Sign Up</Link>
      </div>
      </center>
    );
  }

  export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles }
  ];