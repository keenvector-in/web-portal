import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "@keenvector/kvcl";
import App from "./App.tsx";
import "@keenvector/kvcl/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
