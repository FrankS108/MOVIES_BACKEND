import express from "express";
import {addMovie, getMovies, getMovie, addReview, editMovie, getRate } from "../controllers/movieController.js";
const router = express.Router();

//Añadir una pelicula
router.post('/', addMovie);

//Obtener una pelicula
router.get('/:id', getMovie);

//Obtener todas las peliculas
router.get('/', getMovies);

//Añadir una review
router.post('/:id', addReview);

//Modificar una pelicula
router.put('/edit/:id', editMovie);

//Obtener la calificación de una pelicula
router.get('/rate/:id', getRate);
export default router;