const router = require('express').Router();
const usersRepositories = require('../reprositories/userRepo');

router.get("/:auth/:username", async (req, res) => {
    // find user with req.params.username
    const userIfo = await usersRepositories.getOneBy({username: req.params.username});
    res.render("profile", {currentUser: userIfo, auth: req.params.auth});
});

module.exports = router;