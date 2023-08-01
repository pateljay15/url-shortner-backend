const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// My Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const urlRoutes = require("./routes/url")

// DB Connection
mongoose.connect("mongodb+srv://pateljay15:pateljay15@cluster0.n9rmr.mongodb.net/logicspark?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log("DB CONNECTED")
}).catch((error) => {
    console.log(error)
})

// Middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// My Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", urlRoutes)


// PORT
const port = process.env.PORT || 8000


// Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`)
})