const router = require("express").Router();
const { User } = require("../models/user");
const { Movie, validate } = require("../models/movie");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validObjectId");

// Create movie
router.post("/movie", auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send({ message: error.details[0].message });

    const movie = await Movie(req.body).save();
    res.status(201).send({ data: movie, message: "movie created successfully" });
});

// Get all movie
router.get("/search", async(req, res) => {
    const movie = await Movie.find();
    res.status(200).send({ data: movie });
});

// Update movie
router.put("/:id", [validateObjectId, admin], async(req, res) => {
    const movie = await Song.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.send({ data: movie, message: "Updated movie successfully" });
});

// Delete song by ID
router.delete("/:id", [validateObjectId, admin], async(req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "movie deleted sucessfully" });
});

// Like song
router.put("/like/:id", [validateObjectId, auth], async(req, res) => {
    let resMessage = "";
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(400).send({ message: "movie does not exist" });

    const user = await User.findById(req.user._id);
    const index = user.likedmovie.indexOf(song._id);
    if (index === -1) {
        user.likedMovie.push(movie._id);
        resMessage = "Added to your liked movie";
    } else {
        user.likedMovie.splice(index, 1);
        resMessage = "Removed from your liked movie";
    }

    await user.save();
    res.status(200).send({ message: resMessage });
});

// Get liked songs
router.get("/like", auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    const movie = await movie.find({ _id: user.likedMovie });
    res.status(200).send({ data: movie });
});

module.exports = router;