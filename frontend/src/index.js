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
import RegisterScreen from "./screens/RegisterScreen"
import "./assets/colors.css"
import FeedScreen from "./screens/FeedScreen"
import SearchScreen from "./screens/SearchScreen"
import UserScreen from "./screens/UserScreen"
import PostScreen from "./screens/PostScreen"
import LoginScreen from "./screens/LoginScreen"
import ProfileScreen from "./screens/ProfileScreen"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<FeedScreen />} />
      <Route path="/search" element={<SearchScreen />} />
      <Route path="/user/:id" element={<UserScreen />} />
      <Route path="/myprofile" element={<ProfileScreen />} />
      <Route path="/post/:id" element={<PostScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
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
