import React from "react"
import { theme } from "./assets/theme"
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
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100vh",
              overflow: "auto",
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
