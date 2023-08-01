const mongoose = require('mongoose')
const { ObjectId } = require('mongoose')

const urlSchema = new mongoose.Schema({ 
    urlId: {
        type: String,
    },
    longUrl: {
        type:String,
        trim: true,
    },
    shortUrl: {
        type:String,
        trim: true,
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    clickCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true} )



module.exports = mongoose.model("Url", urlSchema)