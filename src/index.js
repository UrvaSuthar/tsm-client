import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TaskProvider } from "./hooks/TaskContext"; // Import the TaskProvider
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-2hc8zkomnmxgfd4g.us.auth0.com";
const clientId = "pte7iB3nkN3hBRIoMCoWRk6OUBmSi0nU";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "http://localhost:3000/home",
        audience:"http://localhost:5239/"
      }
    }

    >
      <TaskProvider>
        <App />
      </TaskProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
