import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/index.css";
import { useNavigate } from "@remix-run/react"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles }
];

export default function Index() {
  let navigate = useNavigate()

  return (
    <div>
      <div className="center">
          <h1>Welcome To Auto Render System</h1>
      </div>
      <div className="render-button-parent">
        <button id="render-button" type="button" onClick={() => navigate("/userDashboard/render")}>Render Now</button>
      </div>
    </div>
  );
}