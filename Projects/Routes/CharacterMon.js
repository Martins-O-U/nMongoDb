const router = require("express").Router()
const Charac = require('../Models/Character')



router.get('/getchar', async (req, res) => {
    try {
        const getryu = await Charac.find({})
        if (getryu) {
            res.status(200).json(getryu)
        } else {
            res.status(400).json({ maessage: "Data not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, " + error.message })
    }
})

router.post('/addchar', async (req, res) => {
    const { specials, name, ultimateP } = req.body
    const addChar = new Charac({
        specials, name, ultimateP
    })
    try {
        const addedChar = await addChar.save()
        res.status(201).json({ message: "Data Added Successfully! ", data: addedChar })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error.message })
    }
})



module.exports = router