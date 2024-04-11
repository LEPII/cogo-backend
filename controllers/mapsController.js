import { Client } from "@googlemaps/google-maps-services-js";

// [LAT , LONG]
const ANNEX = {
    latitude: 25.822600,
    longitude: -80.280330,
}
// Predict HQ API Search Events by Radius
export async function findEvents(req, res) {
    const body = req.body;


    const keyword = body.keyword; //keyword
    const radius = body.radius; //radius
    const calendarDate = body.date;

    if (radius < 5 || radius > 25) {
        res.status(400).json("Invalid Radius")
    }

    const date = new Date().toISOString().split("T")[0]
    let future = new Date()
    future.setMonth(future.getMonth() + 3)
    future = future.toISOString().split("T")[0]

    try {
        let predictUrl = "https://api.predicthq.com/v1/events/?"
        const params = [
            ["active.gte", date],
            ["active.lte", future],
            ["brand-unsafe.exclude", "true"],
            ["category", keyword],
            ["deleted_reason", "cancelled,duplicate,invalid"],
            ["limit", "10"],
            ["sortby", "date"],
            ["within", `${radius}mi@${ANNEX["latitude"]},${ANNEX["longitude"]}`]
        ]
        for (let i = 0; i < params.length; i++) {
            if (params[i][1]) {
                predictURL += params[i][0] + "=" + params[i][1] + "&";
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

    const search = body.search; //search
    const type = body.type;
    const radius = body.radius * 1600; //radius
    const budget = body.budget;
    let totalBudget = 0
    if (budget < 10) {
        totalBudget = 1
    }else if (budget < 20 ){
        totalBudget = 2
    }else if (budget < 50) {
        totalBudget = 3
    }else{
        totalBudget = 4
    }

    if (body.radius > 50) {
        return res.status(400).json("Over Radius Limit. Must be <= 50")
    }

    try {
        const placesClient = new Client({});
        const result = await placesClient.placesNearby({
            params: {
                key: process.env.mapsKey,
                name: search,
                location: {
                    longitude: ANNEX["longitude"],
                    latitude: ANNEX["latitude"],
                },
                radius: radius,
                budget: totalBudget,
                type: type
            },
            timeout: 1000,
        }).then(r => {
            return r.data.results;
        })

        return res.status(200).json(result)

    } catch (e) {
        console.error(e)
        res.status(500).json("An error occurred")
    }
}