const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validObjectId");
const path = require("path");
let pat = path.join(__dirname, "../");

const sigNUP = (req, res) => {
    res.sendFile(`${pat}public/newuser.html`)
}

router.get("/", sigNUP)


// create user
router.post("/signup", async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
        return res
            .status(403)
            .send({ message: "User with given email already Exist!" });
    //f
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let newUser = await new User({
        ...req.body,
        password: hashPassword,
    }).save();
    //f
    newUser.password = undefined;
    newUser.__v = undefined;
    res.status(200).sendFile(`${pat}public/login.html`)

});
// get all users
router.get("/", admin, async(req, res) => {
    const users = await User.find().select("-password -__v");
    res.status(200).send({ data: users });
});

// get user by id
router.get("/:id", [validateObjectId, auth], async(req, res) => {
    const user = await User.findById(req.params.id).select("-password -__v");
    res.status(200).send({ data: user });
});

// update user by id
router.put("/:id", [validateObjectId, auth], async(req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id, { $set: req.body }, { new: true }
    ).select("-password -__v");
    res.status(200).send({ data: user, message: "Profile updated successfully" });
});

// delete user by id
router.delete("/:id", [validateObjectId, admin], async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Successfully deleted user." });
});


module.exports = router;