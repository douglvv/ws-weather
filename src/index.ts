import express = require('express');
import cors = require('cors');
import axios from 'axios';
import * as dotenv from 'dotenv';
import db from './db/conn';
import Controller from './Controller/Controller';

dotenv.config();

const PORT = parseInt(process.env.PORT as string);

const app = express();

app.use(cors());
app.use(express.json());


app.post('/addWeatherData', Controller.addWeatherData );
app.get('/getCurrentWeatherData', Controller.getCurrentWeatherData);
app.post('/searchWeatherData', Controller.searchWeatherData);
app.put('/editWeatherData/:id', Controller.editWeatherData);
app.delete('/deleteWeatherData/:id', Controller.deleteWeatherData);
app.get('/getWeatherById/:id', Controller.getWeatherById);


db.connect().then(() => {
    app.listen(PORT, () => {
        console.log('Server listening on port:', PORT);
    });
})

