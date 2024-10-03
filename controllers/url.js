const shortid = require('shortid');
const URL = require("../models/url")

const getNewShortUrl = async (req, res) => {
    const url = req.body.url ;
    if (!url) return res.status(400).json({msg: "url is required."}) ;

    const shortId = shortid(8) ;

    const newUrl = await URL.create({
        shortId : shortId ,
        redirectUrl : url ,
        visitHistory : []
    })

    return res.status(200).json({msg: "id created successfully!", id: shortId})
}

const getAnalytics = async (req, res) => {
    const shortId = req.params.shortId ;
    const result = await URL.findOne({shortId}, {visitHistory: 1, _id:0})
    console.log(result) ;
    return res.json({totalClicks : result.visitHistory.length, analytics: result.visitHistory}) ;
}

module.exports = {
    getNewShortUrl,
    getAnalytics
}