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

const App = () => {
  return (
    <>
      <h1>Welcome to the WolfPack</h1>
      <div
        style={{ padding: "20px", backgroundColor: theme.palette.primary.main }}
      >
        <PrimaryButton>Test</PrimaryButton>
        <SecondaryButton>Test</SecondaryButton>
        <Accent1Button>Test</Accent1Button>
        <Accent2Button>Test</Accent2Button>
        <Accent3Button>Test</Accent3Button>
        <Post
          image="../logo.jpg"
          name="WolfPack"
          handle="@WolfPack"
          myPost={true}
          content="HOWWLLLL!!! Welcome to the WolfPack"
          repost={false}
          liked={false}
        />
        <Post
          image="../logo.jpg"
          name="AO"
          handle="@AO"
          myPost={false}
          content="HOWWLLLL!!! We are here!!"
          repost={true}
          liked={true}
        />
      </div>
    </>
  )
}

export default App
