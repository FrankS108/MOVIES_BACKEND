import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDataBase from "./config/db.js";
import moviesRoutes from "./routes/moviesRoutes.js"

const app = express();
app.use(express.json());
dotenv.config();

connectDataBase();

const corsOptions = {
    origin: function(origin, callback){
        if(!origin){
            return callback(null, true);
        }
        else{
            callback(null, true);
        }
    },
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;
app.use("/api/movies", moviesRoutes);

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 4000');
})