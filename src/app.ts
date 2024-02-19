import express from 'express';
import { PORT } from './configs/config';
import router from "./routers/weather.router";

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

