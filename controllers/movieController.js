import Movie from "../models/Movie.js";

const addMovie = async(req, res) => {
    try {
        const movie = new Movie(req.body);
        const movieSaved = await movie.save();
        res.json(movieSaved);
    } catch (error) {
        console.log(error);
    }
};

const getMovies = async(req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.log(error);
    }
};

const getMovie = async(req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findOne().where("imdbid").equals(id);
        if(!movie) res.json({msg: "Película no encontrada"});
        res.json(movie);
    } catch (error) {
        console.log(error);
    }
};

const getRate = async(req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findOne().where("imdbid").equals(id);
        if(!movie) res.json({msg: "Película no encontrada"});
        const { rate, numberOfReviews, imdbid} = movie;
        res.json({
            company: "Frank Reviews",
            rate,
            numberOfReviews,
            imdbid
        })
    } catch (error) {
        console.log(error);
    }
}

const addReview  = async(req, res) => {
    const { rate } = req.body;
    const { id } = req.params;
    const movie = await Movie.findOne().where("imdbid").equals(id);
    console.log(`El rate recibido es ${rate}`);
    if(!movie) res.json({msg: "Película no encontrada"});
    movie.numberOfReviews += 1;
    movie.rate = ((movie.rate * (movie.numberOfReviews - 1) + rate))/movie.numberOfReviews;
    console.log(`El rate total es ${movie.rate}`);
    await movie.save();
    res.json({msg: "Calificación guardada exitosamente!"});
};

const editMovie = async(req, res) => {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.json({msg: "Editado correctamente"});
};

export{
    addMovie,
    getMovies,
    getMovie,
    addReview,
    editMovie,
    getRate
};