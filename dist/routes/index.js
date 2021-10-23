"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const apicache_1 = __importDefault(require("apicache"));
const express_1 = __importDefault(require("express"));
const needle_1 = __importDefault(require("needle"));
// Environment Variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
// Caching
const cache = apicache_1.default.middleware;
const router = express_1.default.Router();
router.get("/", cache('2 minutes'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(url.parse(req.url, true).query);
    try {
        let params = new URLSearchParams();
        if (API_KEY_NAME && API_KEY_VALUE) {
            // @ts-ignore
            params = new URLSearchParams(Object.assign({ [API_KEY_NAME]: API_KEY_VALUE }, url_1.default.parse(req.url, true).query));
        }
        const apiRes = yield (0, needle_1.default)('get', `${API_BASE_URL}?${params}`);
        const data = apiRes.body;
        // Log the request in DEBUG mode
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`);
        }
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
