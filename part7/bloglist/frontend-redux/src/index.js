import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from './store'
import { Provider } from "react-redux";



ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
