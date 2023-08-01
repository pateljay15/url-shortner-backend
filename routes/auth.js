const express = require('express')
const router = express.Router()
const { signout, signup, signin, isSignedIn } = require("../controllers/auth")


router.post("/signup", signup)

router.post("/signin", signin)

router.get("/signout", signout)

router.get("/test", isSignedIn, (req, res) => {
    console.log(req.auth)
    res.send("successful")
})

module.exports = router