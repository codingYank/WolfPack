import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import "./assets/styles/index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import AuthScreen from "./screens/AuthScreen"
import ContentScreen from "./screens/ContentScreen"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<App />}>
      <Route index={true} path="*" element={<ContentScreen />} />
      <Route path="*/reg/*" element={<AuthScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

reportWebVitals()
