import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import styles from "./styles/root.css" 
import MainNavigation from "./components/General/mainNavigation";
import Spinner from "./components/General/spinner";
import { HasAccesTokenAndUserId } from "./utils/userUtils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles }
];

export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8", },
    { title: "Auto Render System", },
    { viewport: "width=device-width,initial-scale=1" },
  ];
};

type LoaderData = {
  isLoggedIn:boolean;
};

export async function loader({request}: LoaderFunctionArgs) {

  const userCookies = await HasAccesTokenAndUserId(request.headers);

  const loaderData:LoaderData = {
    isLoggedIn:userCookies.valid
  };

  return json(loaderData);
}

export default function App() {

  const navigation = useNavigation()
  const loaderData = useLoaderData<LoaderData>();

  const isLoading = navigation.state === 'loading';

  const mainNavigation = MainNavigation(loaderData?.isLoggedIn) 
  
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header> {mainNavigation} </header>
        { isLoading ? <Spinner/> : <Outlet/> }
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      <footer><center>Resolve Entertainment ©</center></footer>
    </html>
  );
}
