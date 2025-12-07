// REACT LESSON 1: Entry Point
// This is where your React app starts. It renders the App component into the HTML.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ReactDOM.createRoot() - Creates a React root to display React components
// document.getElementById('root') - Finds the <div id="root"> in index.html
// .render() - Renders your React component into the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
