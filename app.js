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
const {userRouter} = require("./routes/userRoutes");
const { shipmentRouter } = require('./routes/shipmentRoutes');
const { deliveryRouter } = require('./routes/deliveryRoutes');

//Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

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
        postmanLink: "https://galactic-resonance-793427.postman.co/workspace/TINKTEQ~d4473f16-880b-4a7f-8abf-e7b53be2711a/collection/26636754-b7ee598b-88c1-40a6-accd-d80805df7dcf?action=share&creator=26636754"
    })
});

app.use(`/api/v1/auth`, authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/shipments',shipmentRouter);
app.use('/api/v1/deliveries',deliveryRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async()=>{
    try {
        console.log("MongoDB URL:", process.env.MONGO_URL);
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Listening on port ${port}`));
    } catch (error) {
        app.listen(port, console.log(`Listening on port ${port}`));
        console.log(error);
    };
};

start();