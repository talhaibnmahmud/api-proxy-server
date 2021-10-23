"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
const app = (0, express_1.default)();
// Enable CORS
// app.use(cors());
// Rate Limit
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 100,
});
app.use(limiter);
app.set('trust proxy', 1);
// Static Folder
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Routes
app.use('/api', require('./routes/index.ts'));
// Start server
app.listen(PORT, () => console.log("Server started at port", PORT));
