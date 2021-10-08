const Character = require('./Models/Character')

const kakashi = new Character({
    name: "Kakashi",
    ultimateP: "Sharingan"
})

kakashi.save((error, document) => {
    if (error) {
        console.log(error)
    }
    console.log(document)
})