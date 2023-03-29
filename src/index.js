import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = Express();

console.log(process.env.MONGODB_URI);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notification of successful connection)
db.once('open', function() {
  console.log('MongoDB connection successful');
});

// Middleware
app.use(cors());
app.use(Express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});