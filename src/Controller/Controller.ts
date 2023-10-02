import axios from "axios";
import mongoose from "mongoose";
import Weather from "../models/Weather";
import { Request, Response } from "express";
const translate = require('@iamtraction/google-translate');


export default class Controller {
    public static async addWeatherData(req: Request, res: Response) {
        try {
            let { weather, weather_icon, temp, sens_term, umid, datetime, cidade } = req.body
            console.log(req.body);


            if (!weather || !weather_icon || !temp || !sens_term || !umid || !datetime || !cidade) {
                return res.status(400).send("Missing information.");
            }

            // converte a data em unix para iso
            const timestamp = new Date(datetime * 1000);
            const isoDatetime = timestamp.toISOString();
            console.log(isoDatetime);

            //traduz a descricao para pt-br
            await translate(weather, { from: 'en', to: 'pt' })
                .then((res: { text: any; }) => {
                    weather = res.text
                }).catch((err: any) => {
                    console.error(err);
                });

            const weatherData = new Weather({
                weather,
                weather_icon,
                temp,
                sens_term,
                umid,
                datetime: isoDatetime,
                cidade,
            });

            await weatherData.save();
            console.log(weatherData, 'added to db successfuly')

            res.status(201).json(weatherData);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }

    public static async getCurrentWeatherData(req: Request, res: Response) {
        try {
            // find one garante que só um item sera retornado
            // sort - organiza a busca pelo parametro passado -> datetime
            // datetime: -1 - indica que a busca será em ordem decrescente
            // ultimo item adicionado primeiro
            const currentWeather = await Weather.findOne({}).sort({ datetime: -1 });

            if (!currentWeather) return res.status(404).send("No information found.");

            res.status(200).json(currentWeather);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    public static async searchWeatherData(req: Request, res: Response) {
        try {
            const date = req.body.date;

            const dateObj = new Date(date); // convert the string to a Date object

            const weatherData = await Weather.findOne({
                datetime: {
                    $gte: dateObj.toISOString(),
                }
            });

            if (!weatherData) return res.status(404).send("No information found.");

            res.status(200).json(weatherData);
        } catch (error: any) {
            console.log(error)
            res.status(500).json(error.message)
        }
    }

    public static async editWeatherData(req: Request, res: Response) {
        try {
            const id = req.params.id;

            let weatherData = await Weather.findById(id);

            if (!weatherData) return res.status(404).send('Weather data not found.');

            const { weather, weather_icon, temp, sens_term, umid, datetime, cidade } = req.body;

            if (!weather && !weather_icon && !temp && !sens_term && !umid && !datetime && !cidade) {
                return res.status(400).send('No parameter specified for edition.');
            }

            if (weather) weatherData.weather = weather;
            if (weather_icon) weatherData.weather_icon = weather_icon;
            if (temp) weatherData.temp = temp;
            if (sens_term) weatherData.sens_term = sens_term;
            if (umid) weatherData.umid = umid;
            if (datetime) weatherData.datetime = datetime;
            if (cidade) weatherData.cidade = cidade;

            await weatherData.save();

            res.status(200).json(weatherData);
        } catch (error: any) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    public static async deleteWeatherData(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const deletedWeatherData = await Weather.findByIdAndDelete(id);

            if (!deletedWeatherData) return res.status(404).send('Weather data not found.');

            res.status(200).send('Weather data deleted successfully.');
        } catch (error: any) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

}