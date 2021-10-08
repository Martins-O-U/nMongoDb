const router = require("express").Router()
const Charac = require('../Models/Character')


router.get('/char', async (req, res) => {
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

router.post('/char', async (req, res) => {
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

router.put('/char/:id', async (req, res) => {
    const { specials, name, ultimateP } = req.body;
    let { id } = req.params;
    try {
        let charUpdate = await Charac.findOne({ _id: id })

        if (charUpdate) {
            try {
                charUpdate.specials = specials || charUpdate.specials,
                    charUpdate.name = name || charUpdate.name,
                    charUpdate.ultimateP = ultimateP || charUpdate.ultimateP

                const charUpdated = await charUpdate.save()
                res.status(201).json({ message: "Data updated Successfully! ", data: charUpdated })
            } catch (error) {
                res.status(500).json({ message: "Something went wrong " + error.message })
            }

        } else {
            res.status(400).json({ message: "Incomplete information, please check enter data" })
        }
    } catch (error) {
        res.status(400).json({ message: `Character with id: ${id} does not exist` })
    }
})

router.delete("/char/:id", async (req, res) => {
    let { id } = req.params;

    try {
        const deletedChar = await Charac.findOneAndDelete({ _id: id })
        res.json({ message: "below data has been deleted!", deletedChar })
    } catch (error) {
        res.status(400).json({ message: `Character with id: ${id} does not exist` })
    }

})

module.exports = router