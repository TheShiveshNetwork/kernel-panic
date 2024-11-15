import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";

import { routes } from './routes'
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Register the `bodyParser` middleware here
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use('/api', routes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});