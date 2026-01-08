
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from "./components/ui/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </HelmetProvider>
  </React.StrictMode>
);
