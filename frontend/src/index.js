import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from "react-router-dom";
// import React from 'react';
// import ReactDOM from 'react-dom';
//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter><App/></BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
