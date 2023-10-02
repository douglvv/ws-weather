import { Decimal128 } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const weatherSchema = new Schema(
    {
        weather: {
            type: String,
            required: true
        },
        weather_icon: {
            type: String,
            required: true
        },
        temp: {
            type: Number,
            required: true,
        },
        sens_term: {
            type: Number,
            required: true,
        },
        umid: {
            type: Number,
            required: true,
        },
        datetime: {
            type: Date,
            required: true,
        },
        cidade: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
