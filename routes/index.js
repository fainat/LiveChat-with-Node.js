const router = require('express').Router();
const usersRepositories = require('../reprositories/userRepo');
const messageRepository = require('../reprositories/messRepo');

router.get("/",(req, res) => {
        res.render("login", {auth: false});
    });

router.post("/", async (req, res) => {
    if (req.body.username.indexOf('@') !== -1) {
        await createOrLogin(await checkIsItUser(true, req.body.username));
    } else {
        await createOrLogin(await checkIsItUser(false, req.body.username));
    }
    function checkIsItUser(address, key) {
        let user = {};
        let objName = address ? "email" : "username";
        user[objName] = key;
        user[objName] = user[objName].toLowerCase();
        return usersRepositories.getOneBy(user);
    }
    async function createOrLogin(result) {
        if (!result) {
            let type = req.body.username.includes("@") ? "email" : "username";
            const newUser = {}
            newUser[type] = req.body.username.toLowerCase();
            newUser.password = req.body.password;
            newUser.lastseen = new Date();
            const result = await usersRepositories.create(newUser);
            return res.render("index", {messages: await getAllMessages(), auth: result.username, back: result.username});
        } else {
            const isValid = await usersRepositories.comparePasswords(result.password, req.body.password)
            await usersRepositories.update(result.id, {lastseen: new Date()})
            if (isValid) {
                return res.render("index", {messages: await getAllMessages(), auth: result.username});
            }
        }
    }
});

router.post("/:username", async (req, res) => {
    const newMessage = {
        name: req.body.message,
        auth: req.params.username,
        lastseen: "online"
    }
    await messageRepository.create(newMessage);
    res.render("index", {
        messages: await getAllMessages(),
        auth: req.params.username
    });
});

async function getAllMessages() {
    return await messageRepository.getAll();
}

module.exports = router;