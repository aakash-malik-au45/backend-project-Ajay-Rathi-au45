const router = require("express").Router();
const { Movie } = require("../models/movie");
const { PlayList } = require("../models/playList");
const auth = require("../middleware/auth");

router.get("/search", auth, async(req, res) => {
    const search = req.query.search;
    if (search !== "") {
        const movie = await Movie.find({
            name: { $regex: search, $options: "i" },
        }).limit(10);
        const playlists = await PlayList.find({
            name: { $regex: search, $options: "i" },
        }).limit(10);
        const result = { Movie, playlists };
        res.status(200).send(result);
    } else {
        res.status(200).send({});
    }
});

module.exports = router;