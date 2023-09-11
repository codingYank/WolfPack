import React from "react"
import {
  Accent1Button,
  Accent2Button,
  Accent3Button,
  PrimaryButton,
  SecondaryButton,
} from "./assets/components/button"
import { theme } from "./assets/theme"
import Post from "./assets/components/Post"
import { posts } from "./posts"
import LoginScreen from "./screens/LoginScreen"
import { Outlet } from "react-router-dom"
import Navbar from "./assets/components/Navbar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <>
      <main
        style={{
          backgroundColor: theme.palette.primary.main,
          height: "100vh",
          color: theme.palette.secondary.main,
        }}
      >
        <div style={{ display: "flex" }}>
          <Navbar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Outlet />
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  )
}

export default App
