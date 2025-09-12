import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from "react-router-dom";
import App from './App.jsx'
// import store from "./store/store";
// import { Provider } from "react-redux";


import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
        <App />
        {/* </Provider> */}
    </BrowserRouter>
  </StrictMode>
);

