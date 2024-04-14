import React from "react"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App/>
//   </BrowserRouter>
// )

// ReactDOM.render(
//   <BrowserRouter>
//   <App/>
//   </BrowserRouter>,
//   document.getElementById('root')
// );

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <App/>
</BrowserRouter>
) 
