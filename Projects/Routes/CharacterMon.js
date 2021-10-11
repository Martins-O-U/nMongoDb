const Charac = require('../Models/Character');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const { verifyUser, verifyToken } = require('../../Auth/Auth')

const salt = 10;

const createUsers = async (req, res) => {
    let user = req.body;
    try {
        let hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword
        const response = await User.create(user)
        res.json({ message: "User has been created", data: response })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong,' + error.message })

    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const response = await verifyUser(email, password);
    if (response.status === "ok") {
        res.cookies('token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
    } else {
        res.json(response)
    }
}

const getUsers = async (req, res) => {
    const { token } = req.cookies;
    if (verifyToken(token)) {
        try {
            const getruser = await User.find({})
            if (getruser) {
                res.status(200).json(getruser)
            } else {
                res.status(400).json({ maessage: "Data not found" })
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong, " + error.message })
        }
    } else {
        res.status(401).json({ message: "Please login with your credentials" })
    }
}

const getCharacter = async (req, res) => {
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
}

const addCharacter = async (req, res) => {
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
}

const updateCharacter = async (req, res) => {
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
}

const deleteCharacter = async (req, res) => {
    let { id } = req.params;

    try {
        const deletedChar = await Charac.findOneAndDelete({ _id: id })
        res.json({ message: "below data has been deleted!", deletedChar })
    } catch (error) {
        res.status(400).json({ message: `Character with id: ${id} does not exist` })
    }

}

module.exports = {
    getCharacter,
    addCharacter,
    updateCharacter,
    deleteCharacter,

    createUsers,
    getUsers,
    userLogin
};