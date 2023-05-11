import Movie from "../models/Movie.js";

const addMovie = async(req, res) => {
    try {
        const movie = new Movie(req.body);
        const movieSaved = await movie.save();
        res.status(200).send(movieSaved);
    } catch (error) {
        res.status(400).send({msg: "No se pudo guardar la película."});
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
        if(!movie) res.status(404).send({msg: "Película no encontrada"});
        res.status(200).send(movie);
    } catch (error) {
        console.log(error);
    }
};

const getRate = async(req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findOne().where("imdbid").equals(id);
        if(!movie) res.status(404).send({msg: "Película no encontrada"});
        const { rate, numberOfReviews, imdbid} = movie;
        res.status(200).send({
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
    if(!movie) res.status(404).send({msg: "Película no encontrada"});
    movie.numberOfReviews += 1;
    movie.rate = ((movie.rate * (movie.numberOfReviews - 1) + rate))/movie.numberOfReviews;
    await movie.save();
    res.status(200).send({msg: "Calificación guardada exitosamente!"});
};

const editMovie = async(req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({msg: "Editado correctamente"});
    } catch (error) {
        res.status(400).send({msg: "No se pudo editar."});
        console.log(error);
    }
};

export{
    addMovie,
    getMovies,
    getMovie,
    addReview,
    editMovie,
    getRate
};