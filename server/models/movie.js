const mongoose = require("mongoose");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    movie: { type: String, required: true },
    img: { type: String, required: true },
    duration: { type: String, required: true },
});

const validate = (movie) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        artist: Joi.string().required(),
        movie: Joi.string().required(),
        img: Joi.string().required(),
        duration: Joi.number().required(),
    });
    return schema.validate(movie);
};

const Movie = mongoose.model("movie", movieSchema);

module.exports = { Movie, validate };