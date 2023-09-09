import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import "./assets/styles/index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import AuthScreen from "./screens/AuthScreen"
import ContentScreen from "./screens/ContentScreen"
import "./assets/colors.css"

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
