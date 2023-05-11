import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    synopsis:{
        type: String,
        required: true,
        trim: true
    },
    genre:[
        {
            type: String,
            required: true,
            trim: true
        }
    ],
    released:{
        type: Number,
        required: true,
        trim: true
    },
    imageurl:{
        type: String,
        required: false,
        trim: true
    },
    rate:{
        type: Number,
        required: true,
        default: 0,
    },
    numberOfReviews:{
        type: Number,
        required: true,
        default: 0,
    },
    imdbid:{
        type: String,
        required: true,
        trim: "true",
    }
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;