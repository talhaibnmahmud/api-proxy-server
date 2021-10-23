import url from 'url';
import apicache from 'apicache';
import express, { NextFunction, Request, Response, Router } from "express";
import needle, { NeedleResponse } from "needle";

// Environment Variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Caching
const cache = apicache.middleware;

const router: Router = express.Router();

router.get("/", cache('2 minutes'), async (req: Request, res: Response, next: NextFunction) => {
    // console.log(url.parse(req.url, true).query);

    try {
        let params: URLSearchParams = new URLSearchParams();
        if (API_KEY_NAME && API_KEY_VALUE) {
            // @ts-ignore
            params = new URLSearchParams({
                [API_KEY_NAME]: API_KEY_VALUE,
                ...url.parse(req.url, true).query,
            });
        }

        const apiRes: NeedleResponse = await needle('get', `${API_BASE_URL}?${params}`);
        const data = apiRes.body;

        // Log the request in DEBUG mode
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`);
        }

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }

});

module.exports = router;
