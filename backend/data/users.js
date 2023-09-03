import bcrypt from "bcryptjs"

const users = [
  {
    name: "WolfPack",
    email: "admin@wolfpacksocial.com",
    handle: "@wolfpack",
    password: bcrypt.hashSync("123456", 10),
    description: "HOOooWWWlllLLL",
    profilePicture: "/images/logo.jpg",
    followers: [],
    following: [],
  },
  {
    name: "Tyler",
    email: "tyler@wolfpacksocial.com",
    handle: "@tyler",
    password: bcrypt.hashSync("123456", 10),
    description: "Founder WolfPack",
    profilePicture: "/images/logo.jpg",
    followers: [],
    following: [],
  },
]

export default users
