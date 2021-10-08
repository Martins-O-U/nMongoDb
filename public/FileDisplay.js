const router = require("express").Router()

router.get('/browse', (req, res) => {
    res.sendFile(__dirname + '/browserRoute.html')
})

module.exports = router