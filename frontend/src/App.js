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
        <Outlet />
      </main>
      {/* <h1>Welcome to the WolfPack</h1>
      <div
        style={{ padding: "20px", backgroundColor: theme.palette.primary.main }}
      >
        <PrimaryButton>Test</PrimaryButton>
        <SecondaryButton>Test</SecondaryButton>
        <Accent1Button>Test</Accent1Button>
        <Accent2Button>Test</Accent2Button>
        <Accent3Button>Test</Accent3Button>
        {posts.map((post) => {
          return <Post post={post} />
        })}
      </div>
      <LoginScreen /> */}
    </>
  )
}

export default App
