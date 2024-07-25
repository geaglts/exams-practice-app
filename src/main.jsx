import ReactDOM from "react-dom/client";
import axios from "axios";
import "./styles/global.css";

import { App } from "./App.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
