import mongoose, { Schema, Document } from 'mongoose';

interface IWeatherData extends Document {
    coord: {
        lon: number;
        lat: number;
    };
    weather: [{
        id: number;
        main: string;
        description: string;
        icon: string;
    }];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

const WeatherSchema: Schema = new Schema({
    coord: { lon: Number, lat: Number },
    weather: [{
        id: Number,
        main: String,
        description: String,
        icon: String,
    }],
    main: {
        temp: Number,
        feels_like: Number,
        temp_min: Number,
        temp_max: Number,
        pressure: Number,
        humidity: Number,
        sea_level: Number,
        grnd_level: Number,
    },
    wind: { speed: Number, deg: Number, gust: Number },
    clouds: { all: Number },
    dt: Number,
    sys: { country: String, sunrise: Number, sunset: Number },
    timezone: Number,
    id: Number,
    name: String,
    cod: Number,
}, {
    timestamps: true,
    versionKey: false,
});

const WeatherDataModel = mongoose.model<IWeatherData>('WeatherData', WeatherSchema);

export { WeatherDataModel, IWeatherData };
