import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const adjustRootHeight = () => {
  rootElement.style.height = `${window.innerHeight}px`;
}
adjustRootHeight();
const adjustRootWidth = () => {
  rootElement.style.width = `${window.innerWidth}px`;
}
adjustRootWidth();

window.addEventListener("resize", adjustRootWidth);
window.addEventListener("resize", adjustRootHeight);

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
