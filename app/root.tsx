import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/main.css" 
import MainNavigation from "./components/MainNavigation";

export const links: LinksFunction = () => [
   { rel: "stylesheet", href: styles }
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header> <MainNavigation/> </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      <footer><center>Resolve Entertainment ©</center></footer>
    </html>
  );
}
