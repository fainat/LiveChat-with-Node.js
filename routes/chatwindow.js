const router = require('express').Router();
const messageRepository = require('../reprositories/messRepo');

router.route("/").get( async (req, res) => {
    res.render("index", {
        messages: await getAllMessages(),
        auth: false
    });
    async function getAllMessages() {
        return await messageRepository.getAll();
    }
})

module.exports = router;