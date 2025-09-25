import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./app/store.js";
import ScrollToTop from "./componets/common/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
