import { Router } from "express";
import axios from "axios";

const router = Router();
const api = axios.create({
    baseURL: "https://api.openweathermap.org",
    timeout: 10000,
});

router.get("/location", async (req, res) => {
    const { lat, lon, limit = 1 } = req.query;
    const key = process.env.WEATHER_API_KEY;

    if (!key) return res.status(500).json({ error: "API key missing" });

    try {
        const response = await api.get("/geo/1.0/reverse", {
            params: { lat, lon, limit, appid: key },
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch location" });
    }
});

router.get("/weather", async (req, res) => {
    const { lat, lon, q } = req.query;
    const key = process.env.WEATHER_API_KEY;

    if (!key) return res.status(500).json({ error: "API key missing" });

    let params = { units: "metric", appid: key };

    if (lat && lon) {
        params.lat = lat;
        params.lon = lon;
    } else if (q) {
        params.q = q;
    } else {
        return res.status(400).json({ error: "Missing lat/lon or q" });
    }

    try {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", { params });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch weather" });
    }
});

router.get('/search-name-of-place', async (req, res) => {
    const {q, limit = 1} = req.query;
    const key = process.env.WEATHER_API_KEY;

    if (!key) return res.status(500).json({ error: "API key missing" });
    if (!q) return res.status(400).json({ error: "Missing search query" });

    try{
        const response = await api.get('/geo/1.0/direct', {
            params: {q, limit, appid: key },
        })
        res.json(response.data);
    }catch(err){
        res.status(500).json({ error: "Failed to fetch location" });
    }
})


export default router;
