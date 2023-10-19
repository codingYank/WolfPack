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
import FollowingScreen from "./screens/FollowingScreen"
import FollowersScreen from "./screens/FollowersScreen"
import PrivateRoute from "./assets/components/PrivateRoute"
import ValidatedRoute from "./assets/components/ValidatedRoute"
import VerficationScreen from "./screens/VerficationScreen"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/search/:keyword/:page" element={<SearchScreen />} />
      <Route path="/search" element={<SearchScreen />} />
      <Route path="/user/:id" element={<UserScreen />} />
      <Route path="/user/:id/following" element={<FollowingScreen />} />
      <Route path="/user/:id/followers" element={<FollowersScreen />} />
      <Route path="/post/:id" element={<PostScreen />} />
      <Route path="/verify/:id" element={<VerficationScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="" element={<ValidatedRoute />}>
          <Route index={true} path="/" element={<FeedScreen />} />
        </Route>
      </Route>
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
