import { Client } from "@googlemaps/google-maps-services-js";


// [LAT , LONG]
const ANNEX = {
    latitude: 25.822600,
    longitude: -80.280330,
}
// Predict HQ API Search Events by Radius
export async function findEvents(req, res) {
    const body = req.body;

    const categories = ['conferences','expos','concerts','festivals','performing-arts','sports', 'community']
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]

    const category = body.category || randomCategory;
    const radius = body.radius || "25";
    const budget = body.budget || "100";
    const eventDate = body.date || new Date().toISOString().split("T")[0];

    if (radius < 5 || radius > 50) {
        res.status(400).json("Invalid Radius")
    }
    if (body.date && /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(calendarDate)) {
        res.status(400).json("Invalid Date")
    }

    let future = new Date()
    future.setMonth(future.getMonth() + 3)
    future = future.toISOString().split("T")[0]

    try {
        let predictUrl = "https://api.predicthq.com/v1/events/?"
        const params = [
            ["active.gte", eventDate], //Date range start
            ["active.lte", future], // Date Range End
            ["brand-unsafe.exclude", "true"],
            ["category", category], //Key Word e.g. Concert
            ["deleted_reason", "cancelled,duplicate,invalid"],
            ["limit", "10"],
            ["sortby", "date"],
            ["predicted_event_spend.lte", `${budget}`], //Budget
            ["within", `${radius}mi@${ANNEX["latitude"]},${ANNEX["longitude"]}`],
        ]

        for (let i = 0; i < params.length; i++) {
            if (params[i][1]) {
                predictUrl += params[i][0] + "=" + params[i][1] + "&";
            }
        }

        const result = await fetch(predictUrl,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer" + " " + process.env.predictAccessToken,
                }
            }
        )
        res.status(200).json(await result.json())
    } catch (e) {
        console.error(e)
        res.status(500).json("An error occurred")
    }
}

// Google API Text Search
export async function findPlace(req, res) {
    const body = req.body;

    const types = ["art_gallery", "museum", "library", "amusement_park", "aquarium", "bowling_alley", "dog_park", "marina", "movie_theater", "national_park", "night_club", "park", "tourist_attraction", "zoo", "bakery", "bar", "cafe", "spa", "restaurant", "book_store", "gym", "store"]
    const randomType = types[Math.floor(Math.random() * types.length)];

    const type = body.type || randomType;
    const radius = body.radius * 1600 || 25 * 1600; //radius
    const budget = body.budget;
    let totalBudget = 0
    if (!budget || budget == 0) {
        totalBudget = 0
    } else if (budget < 10) {
        totalBudget = 1
    } else if (budget < 20) {
        totalBudget = 2
    } else if (budget < 50) {
        totalBudget = 3
    } else {
        totalBudget = 4
    }

    if (body.radius > 50) {
        return res.status(400).json("Over Radius Limit. Must be <= 50")
    }

    try {
        const placesClient = new Client({});
        const q = await placesClient.placesNearby({
            params: {
                key: process.env.mapsKey,
                location: {
                    longitude: ANNEX["longitude"],
                    latitude: ANNEX["latitude"],
                },
                radius: radius,
                maxPrice: totalBudget,
                opennow: true,
                type: type
            },
            timeout: 1000,
        }).then(r => {
            return r.data.results;
        })
        const filteredQ= q.filter( place => place.user_ratings_total > 100 && place.rating >= 2.5)

        if (!filteredQ.length) {
            return res.status(300).json({ success: false })
        }
        const data = filteredQ[Math.floor(Math.random() * filteredQ.length)];

        const result = {
            success: true,
            name: data.name || "",
            rating: data.rating,
            address: data.vicinity,
            budget: budget,
            type: type,
        }

        return res.status(200).json(result)

    } catch (e) {
        console.error(e)
        res.status(500).json("An error occurred")
    }
}