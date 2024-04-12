import { genAI } from "../gemini-start.js";

// [LAT , LONG]
const ANNEX = {
    latitude: 25.822600,
    longitude: -80.280330,
}

export async function generateText(req, res) {
    const promptBody = req.body.prompt
    if (!promptBody) {
        res.status(404).send("No prompt");
    }
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        const result = await model.generateContent(promptBody);
        const response = await result.response;
        const text = response.text()
        res.status(200).json({ output: text })
    } catch (e) {
        console.error(e)
        res.status(500).json("An error has occurred.")
    }
}

export async function generateSuggestion (req, res) {
    const preference1 = req.body.preference1;
    const preference2 = req.body.preference2;
    const preference3 = req.body.preference3;

    let promptBody = (preference1 && preference2 && preference3) ? `Suggest 5 "events" and 5 "activites" given someone's preference in [${preference1}] [${preference2}] [${preference3}]` : `Suggest 5 "events" and 5 "activities".`;

    const promptFormat = `
    Pick from the following keyword array for events: ['public-holidays','conferences','expos','concerts','festivals','performing-arts','sports', 'community']
    Pick from the following keyword array for activities: ["art_gallery","museum","performing_arts_theater","library","amusement_park","aquarium","bowling_alley","dog_park","historical_landmark","marina","movie_theater","national_park","night_club","park","tourist_attraction","zoo","bakery","bar","cafe","restaurant","sandwich_shop","spa","book_store","gym","store"]
    Generate a fun title for each as though they are chapters in a book.
    Generate a brief description that matches the keyword and title and encourage the user to go out.
    Return an array of objects in the following JSON format: {event:[{title:"", description:"", keyword:""}], activity: [{title:"", keyword:""}]}
    No linebreaks or formatting. Just a string that can be parsed into JSON.
    `

    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.weatherKey}&q=${ANNEX["latitude"]},${ANNEX["longitude"]}&aqi=no`

    try {
        const weatherFetch = await fetch(weatherUrl)
            .then((result) => {
                return result.json()
            })
        const weatherCondition = weatherFetch["current"]["condition"]["text"];
        promptBody += `Take into consideration that the weather condition is ${weatherCondition}`
    } catch (e) {
        console.error(e)
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        promptBody += promptFormat;
        const result = await model.generateContent(promptBody);
        const response = await result.response;
        const text = response.text()
        res.status(200).json(JSON.parse(text))
    } catch (e) {
        console.error(e)
        return res.status(500).send("There's been an error")
    }
}