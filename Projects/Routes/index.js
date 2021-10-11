const router = require("express").Router()
const { getCharacter, addCharacter, updateCharacter, deleteCharacter, createUsers, getUsers, userLogin } = require('./CharacterMon')

router.get('/char', getCharacter);
router.post('/char', addCharacter);
router.put('/char/:id', updateCharacter);
router.delete('/char/:id', deleteCharacter);

router.post("/user", createUsers);
router.get("/user", getUsers);
router.post("/userlogin", userLogin)

module.exports = router