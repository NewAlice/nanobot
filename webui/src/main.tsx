import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./globals.css";
import "./i18n";

// 放在 import 语句下方，App 初始化之前
if (typeof window !== "undefined" && window.crypto && !window.crypto.randomUUID) {
  // @ts-ignore
  window.crypto.randomUUID = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}

const root = document.getElementById("root");
if (!root) throw new Error("root element missing");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
