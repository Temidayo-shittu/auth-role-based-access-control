require('dotenv').config();
require('express-async-errors');

//express
const express = require('express');
const app = express();

//Rest of packages
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//Database
const connectDB =  require('./db/connect');

//Routes
const { authRouter } = require("./routes/authRoutes");

app.set('trust proxy',1);

app.use(rateLimiter({
    windowsMs: 15 * 60 * 1000,
    max:60
}));

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());

// Load API routes
app.get("/", (req, res) => res.send("API is up and running"));
app.get("/api/v1", (req, res) => {
    res.json({
        message:"JWT-Based Authentication System API V1, [Health check::: API up and running]",
        //postmanLink: "https://www.postman.com/galactic-resonance-793427/workspace/babban-gona-hackathon/collection/26636754-1a805b8c-845a-4776-a9fd-1ca256404349?action=share&creator=26636754"
    })
});

app.use(`${config.api.prefix}/auth`, authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Listening on port ${port}`));
    } catch (error) {
        app.listen(port, console.log(`Listening on port ${port}`));
        console.log(error);
    };
};

start();