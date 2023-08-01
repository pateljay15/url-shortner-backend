const Url = require("../models/url")
var randomstring = require("randomstring");



exports.shorten = (req, res) => {
    let tempId = randomstring.generate(7)
    console.log(req.body)
    const short = new Url({
        longUrl: req.body.longUrl,
        shortUrl: `http://localhost:8000/api/${tempId}`,
        urlId: tempId,
        user: req.body.user,
        clickCount: 0
    })
    short.save((err, url) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            longUrl: url.longUrl,
            shortUrl: url.shortUrl,
            user: url.user,
            clickCount: url.clickCount
        })
    })
}

exports.updateUrl = (req, res) => {

    Url.findById(req.url._id).exec((err, ur) => {
        if(err || !ur){
            return res.status(400).json({
                error: "No url was found in DB"
            })
        }
        ur.longUrl = req.url.longUrl
        ur.save((err, url) => {
            if(err){
                return res.status(400).json({
                    error: "NOT able to save url in DB"
                })
            }
            res.json({
                longUrl: url.longUrl,
                shortUrl: url.shortUrl,
                id: url.user,
                clickCount: url.clickCount
            })
        })
    })
}

exports.viewOri = (req, res) => {
    Url.findOne({urlId: req.params.urlId}).exec((err, url) => {
        if(err || !url) {
            return res.status(400).json({
                error: "No url found"
            })
        }
        url.clickCount = url.clickCount + 1
        url.save((err, ur) => {
            if(err){
                return res.status(400).json({
                    error: "NOT able to save url in DB"
                })
            }
            return res.redirect(ur.longUrl);
        })
    })
}

exports.getUserUrls = (req, res) => {
    Url.find({user: req.profile._id}).exec((err, urls) => {
        if(err || !urls){
            return res.status(400).json({
                error: "No urls found"
            })
        }
        return res.json(urls)
    })
}

exports.getUserUrl = (req, res) => {
    Url.find({_id: req.params.urlId}).exec((err, url) => {
        if(err || !url){
            return res.status(400).json({
                error: "No urls found"
            })
        }
        return res.json(url)
    })
}