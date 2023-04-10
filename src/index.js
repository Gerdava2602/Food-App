import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
/* import cors from "cors"; */

//Routers
import userRouter from "./routes/user.js";
import restaurantRouter from "./routes/restaurant.js"
import productRouter from "./routes/product.js"

dotenv.config();

const app = Express();

// Middleware
/* app.use(cors()); */
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRouter);
app.use("/api/restaurants", restaurantRouter)
app.use("/api/products", productRouter)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
})

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notification of successful connection)
db.once('open', function() {
console.log('MongoDB connection successful');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});