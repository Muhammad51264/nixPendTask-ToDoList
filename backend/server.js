const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
const helmet = require ("helmet");
const dotenv = require ("dotenv");

dotenv.config({path : "./config/config.env"});


const DB = process.env.DATABASE;
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose.connect(DB).then(()=>{
    console.log("Database connected !");
}).catch(err => console.log(err));

const cardRouter= require('./routes/card-router');
app.use("/card",cardRouter);





app.listen(8080,()=>{
    console.log('listening on port 8080');
});