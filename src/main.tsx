import React from "react";
import ReactDOM from "react-dom/client";
import { setup } from "twind";
import App from "./App.jsx";

setup({
  theme: {
    fontFamily: {
      sans: ["Zen Maru Gothic", "sans-serif"],
    },
    extend: {},
  },
});

const elem = document.getElementById("root");

if (elem === null) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(elem).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
