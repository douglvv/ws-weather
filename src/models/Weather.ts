import { Decimal128 } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const weatherSchema = new Schema({
    temp: {
        type: Decimal128,
        required: true,
    },
    sens_term: {
        type: Decimal128,
        required: true,
    },
    umid: {
        type: Decimal128,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    cidade: {
        type: String,
        required: true
    }
});


const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;