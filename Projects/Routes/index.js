const router = require("express").Router()
const { getCharacter, addCharacter, updateCharacter, deleteCharacter } = require('./CharacterMon')

router.get('/char', getCharacter);
router.post('/char', addCharacter);
router.put('/char/:id', updateCharacter);
router.delete('/char/:id', deleteCharacter);


module.exports = router