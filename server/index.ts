import dotenv from 'dotenv';
import express, { Application } from "express";
import rateLimit, { RateLimit } from "express-rate-limit";
import path from "path";

const PORT = process.env.PORT || 5000;
dotenv.config();

const app: Application = express();

// Enable CORS
// app.use(cors());

// Rate Limit
const limiter: RateLimit = rateLimit({
    windowMs: 60 * 1000,   // 1 Minutes
    max: 100,
});
app.use(limiter);
app.set('trust proxy', 1);

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes/index.ts'));

// Start server
app.listen(PORT, () => console.log("Server started at port", PORT));
