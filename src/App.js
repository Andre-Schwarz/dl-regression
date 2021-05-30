import React from "react";

import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import PredictionPage from "./pages/prediction";
import DocumentationPage from "./pages/documentation";

function App() {

    return <div className="App">
        <Router basename="/dl-regression">
            <Route exact path="/" component={PredictionPage}/>
            <Route exact path="/documentation" component={DocumentationPage}/>
        </Router>
    </div>;
}

export default App;
