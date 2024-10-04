import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/authContext.jsx'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={2000}
        closeOnClick
      />
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
