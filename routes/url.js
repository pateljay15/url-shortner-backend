const express = require('express')
const router = express()


const { getUserById } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { shorten, updateUrl, getUserUrls, viewOri, getUserUrl } = require("../controllers/url")


router.param("userId", getUserById)


router.post("/shorten/:userId", isSignedIn, isAuthenticated, shorten)

router.put("/update-url/:userId", isSignedIn, isAuthenticated, updateUrl)

router.get("/user-urls/:userId", isSignedIn, isAuthenticated, getUserUrls)

router.get("/:urlId", viewOri)

router.get("/get-url/:urlId", getUserUrl)

module.exports = router