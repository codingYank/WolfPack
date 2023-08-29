import React from "react"
import {
  Accent1Button,
  Accent2Button,
  Accent3Button,
  PrimaryButton,
  SecondaryButton,
} from "./assets/components/button"
import { theme } from "./assets/theme"

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
      </div>
    </>
  )
}

export default App
