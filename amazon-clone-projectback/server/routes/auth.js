const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const path = require("path");
let pat = path.join(__dirname, "../");
const express = require("express");
const app = express();
app.use(express.static("public"));
//login work in postman
const login = (req, res) => {
    res.sendFile(`${pat}public/login.html`)
}

router.get("/", login)
router.post("/login", async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({ message: "invalid email or password!" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send({ message: "Invalid email or password!" });

    const token = user.generateAuthToken();


    //res.status(200).send({ data: token, message: "Signing in please wait..." });
    res.status(200).sendFile(`${pat}public/main.html`)

});


module.exports = router;