import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const activityArr = [
        { "name": "Picnic", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Bowling", "outdoors": false, "indoors": true, "timeSensitive": false, "weatherDependent": false },
        { "name": "Hiking", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Museum Visit", "outdoors": false, "indoors": true, "timeSensitive": false, "weatherDependent": false },
        { "name": "Beach Volleyball", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Cooking Class", "outdoors": false, "indoors": true, "timeSensitive": true, "weatherDependent": false },
        { "name": "Kayaking", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Indoor Rock Climbing", "outdoors": false, "indoors": true, "timeSensitive": false, "weatherDependent": false },
        { "name": "Outdoor Cinema", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Board Games Night", "outdoors": false, "indoors": true, "timeSensitive": false, "weatherDependent": false },
        { "name": "Wine Tasting", "outdoors": false, "indoors": true, "timeSensitive": true, "weatherDependent": false },
        { "name": "Camping", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Escape Room", "outdoors": false, "indoors": true, "timeSensitive": true, "weatherDependent": false },
        { "name": "Bike Tour", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Paintball", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Pottery Class", "outdoors": false, "indoors": true, "timeSensitive": true, "weatherDependent": false },
        { "name": "Street Food Tour", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Aquarium Visit", "outdoors": false, "indoors": true, "timeSensitive": false, "weatherDependent": false },
        { "name": "Zoo Visit", "outdoors": true, "indoors": false, "timeSensitive": false, "weatherDependent": true },
        { "name": "Botanical Garden Visit", "outdoors": true, "indoors": false, "timeSensitive": false, "weatherDependent": true },
        { "name": "Karaoke Night", "outdoors": false, "indoors": true, "timeSensitive": true, "weatherDependent": false },
        { "name": "Golfing", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Skiing/Snowboarding", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Ice Skating", "outdoors": false, "indoors": true, "timeSensitive": true, "weatherDependent": false },
        { "name": "Surfing", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Art Gallery Hop", "outdoors": false, "indoors": true, "timeSensitive": false, "weatherDependent": false },
        { "name": "Fishing", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Scavenger Hunt", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Yoga Class", "outdoors": false, "indoors": true, "timeSensitive": true, "weatherDependent": false },
        { "name": "Hot Air Balloon Ride", "outdoors": true, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        { "name": "Boating", "outdoors": true, "indoors": false, "timeSensitive": false, "weatherDependent": true },
        { "name": "Party", "outdoors": true, "indoors": true, "timeSensitive": true, "weatherDependent": true },
        { "name": "Dancing", "outdoors": true, "indoors": true, "timeSensitive": false, "weatherDependent": false },
        { "name": "Stroll", "outdoors": true, "indoors": true, "timeSensitive": false, "weatherDependent": true },
        { "name": "Exercise", "outdoors": true, "indoors": true, "timeSensitive": false, "weatherDependent": true },
        { "name": "Movies", "outdoors": true, "indoors": true, "timeSensitive": true, "weatherDependent": true },
        { "name": "Networking", "outdoors": true, "indoors": true, "timeSensitive": true, "weatherDependent": true },
        { "name": "Charity", "outdoors": true, "indoors": true, "timeSensitive": true, "weatherDependent": true },
        { "name": "Concert", "outdoors": true, "indoors": true, "timeSensitive": true, "weatherDependent": true },
        { "name": "Festival", "outdoors": true, "indoors": false, "timeSensitive": false, "weatherDependent": false },
        { "name": "Community", "outdoors": false, "indoors": false, "timeSensitive": true, "weatherDependent": true },
        // { "name": "", "outdoors": false, "indoors": false, "timeSensitive": false, "weatherDependent": false },
    ]
    const experienceArr = [
        { "name": "Pottery Class Event", "cost": 97.15, "time": "2024-05-01T17:40:23Z", "location": "Millennium Park, Chicago", "description": "Get creative and mold your own pottery pieces in this artistic class.", "activityName": "Pottery Class" },
        { "name": "Cooking Class Event", "cost": 70.11, "time": "2024-05-02T17:40:23Z", "location": "Central Park, NYC", "description": "Learn new recipes and cooking techniques in a professional kitchen.", "activityName": "Cooking Class" },
        { "name": "Museum Visit Event", "cost": 89.66, "time": "2024-05-14T17:40:23Z", "location": "Millennium Park, Chicago", "description": "Discover history, art, and culture at our local museum.", "activityName": "Museum Visit" },
        { "name": "Beach Volleyball Event", "cost": 75.54, "time": "2024-05-27T17:40:23Z", "location": "Golden Gate Park, SF", "description": "Jump into action with a fun and energetic game of beach volleyball.", "activityName": "Beach Volleyball" },
        { "name": "Cooking Class Event", "cost": 94.69, "time": "2024-05-23T17:40:23Z", "location": "Griffith Park, LA", "description": "Learn new recipes and cooking techniques in a professional kitchen.", "activityName": "Cooking Class" },
        { "name": "Aquarium Visit Event", "cost": 85.16, "time": "2024-05-07T17:40:23Z", "location": "Central Park, NYC", "description": "Marvel at the wonders of marine life during a visit to the aquarium.", "activityName": "Aquarium Visit" },
        { "name": "Ice Skating Event", "cost": 51.92, "time": "2024-06-02T17:40:23Z", "location": "Balboa Park, San Diego", "description": "Glide across the ice and enjoy a day of ice skating.", "activityName": "Ice Skating" },
        { "name": "Street Food Tour Event", "cost": 64.52, "time": "2024-05-16T17:40:23Z", "location": "Zilker Park, Austin", "description": "Taste the city's best street food on a guided culinary tour.", "activityName": "Street Food Tour" },
        { "name": "Outdoor Cinema Event", "cost": 58.78, "time": "2024-05-23T17:40:23Z", "location": "Griffith Park, LA", "description": "Watch your favorite movies under the stars at our outdoor cinema.", "activityName": "Outdoor Cinema" },
        { "name": "Board Games Night Event", "cost": 68.09, "time": "2024-05-08T17:40:23Z", "location": "Golden Gate Park, SF", "description": "Gather around for a night of strategy, fun, and laughter with board games.", "activityName": "Board Games Night" },
        { "name": "Wine Tasting Event", "cost": 93.5, "time": "2024-05-09T17:40:23Z", "location": "Zilker Park, Austin", "description": "Savor the flavors of fine wines in a sophisticated wine tasting event.", "activityName": "Wine Tasting" },
        { "name": "Camping Event", "cost": 38.52, "time": "2024-04-30T17:40:23Z", "location": "Millennium Park, Chicago", "description": "Unwind and connect with nature on a peaceful camping trip.", "activityName": "Camping" },
        { "name": "Escape Room Event", "cost": 38.18, "time": "2024-05-27T17:40:23Z", "location": "Golden Gate Park, SF", "description": "Solve puzzles and escape the room in this thrilling group challenge.", "activityName": "Escape Room" },
        { "name": "Bike Tour Event", "cost": 65.97, "time": "2024-05-19T17:40:23Z", "location": "Griffith Park, LA", "description": "Cycle through scenic routes and discover the city's hidden gems.", "activityName": "Bike Tour" },
        { "name": "Paintball Event", "cost": 45.85, "time": "2024-05-12T17:40:23Z", "location": "Zilker Park, Austin", "description": "Engage in an exhilarating and colorful game of paintball.", "activityName": "Paintball" },
        { "name": "Pottery Class Event", "cost": 97.15, "time": "2024-05-01T17:40:23Z", "location": "Millennium Park, Chicago", "description": "Get creative and mold your own pottery pieces in this artistic class.", "activityName": "Pottery Class" },
        { "name": "Zoo Visit Event", "cost": 35.4, "time": "2024-05-20T17:40:23Z", "location": "Balboa Park, San Diego", "description": "Meet exotic animals and learn about wildlife conservation at the zoo.", "activityName": "Zoo Visit" },
        { "name": "Botanical Garden Visit Event", "cost": 25.29, "time": "2024-05-25T17:40:23Z", "location": "Griffith Park, LA", "description": "Stroll through beautiful gardens and learn about diverse plant species.", "activityName": "Botanical Garden Visit" },
        { "name": "Skiing/Snowboarding Event", "cost": 90.38, "time": "2024-05-16T17:40:23Z", "location": "Golden Gate Park, SF", "description": "Hit the slopes for an adrenaline-packed day of skiing or snowboarding.", "activityName": "Skiing/Snowboarding" },
        { "name": "Karaoke Night Event", "cost": 55.5, "time": "2024-05-15T17:40:23Z", "location": "Millennium Park, Chicago", "description": "Sing your heart out and enjoy a night of music and fun at karaoke.", "activityName": "Karaoke Night" },
        { "name": "Golfing Event", "cost": 72.89, "time": "2024-05-11T17:40:23Z", "location": "Central Park, NYC", "description": "Enjoy a day on the green with a round of golf among friends.", "activityName": "Golfing" },
        { "name": "Ice Skating Event", "cost": 51.92, "time": "2024-06-02T17:40:23Z", "location": "Balboa Park, San Diego", "description": "Glide across the ice and enjoy a day of ice skating.", "activityName": "Ice Skating" },
        { "name": "Surfing Event", "cost": 60.3, "time": "2024-05-18T17:40:23Z", "location": "Golden Gate Park, SF", "description": "Catch waves and embrace the surf in this exhilarating water sport.", "activityName": "Surfing" },
        { "name": "Art Gallery Hop Event", "cost": 20.67, "time": "2024-05-06T17:40:23Z", "location": "Zilker Park, Austin", "description": "Explore local art galleries and immerse yourself in the art scene.", "activityName": "Art Gallery Hop" },
        { "name": "Fishing Event", "cost": 33.98, "time": "2024-05-03T17:40:23Z", "location": "Griffith Park, LA", "description": "Relax by the water and enjoy a peaceful day of fishing.", "activityName": "Fishing" },
        { "name": "Scavenger Hunt Event", "cost": 22.5, "time": "2024-05-04T17:40:23Z", "location": "Central Park, NYC", "description": "Embark on an adventure and solve clues in a fun scavenger hunt.", "activityName": "Scavenger Hunt" },
        { "name": "Yoga Class Event", "cost": 15.75, "time": "2024-05-13T17:40:23Z", "location": "Balboa Park, San Diego", "description": "Find your zen and improve your flexibility in a soothing yoga class.", "activityName": "Yoga Class" },
        { "name": "Hot Air Balloon Ride Event", "cost": 250.0, "time": "2024-05-24T17:40:23Z", "location": "Zilker Park, Austin", "description": "Experience breathtaking views from above in a hot air balloon ride.", "activityName": "Hot Air Balloon Ride" },
        { "name": "Kayaking Event", "cost": 55.22, "time": "2024-05-10T17:40:23Z", "location": "Golden Gate Park, SF", "description": "Paddle through serene waters and connect with nature on a kayaking adventure.", "activityName": "Kayaking" },
        { "name": "Indoor Rock Climbing Event", "cost": 40.25, "time": "2024-05-21T17:40:23Z", "location": "Central Park, NYC", "description": "Challenge yourself and reach new heights with indoor rock climbing.", "activityName": "Indoor Rock Climbing" },
        { "name": "Birthday Bash", "cost": 200.00, "time": "2024-05-15T18:00:00", "location": "Central Park", "description": "Celebrate Sarah's birthday with food, drinks, and games in the park.", "activityName": "Picnic" },
        { "name": "Summer BBQ Cookout", "cost": 100.00, "time": "2024-06-22T15:00:00", "location": "John's Backyard", "description": "Join us for a backyard barbecue with grilled favorites and fun outdoor games.", "activityName": "Cooking Class" },
        { "name": "Art Exhibition Opening", "cost": 0.00, "time": "2024-07-10T19:00:00", "location": "Downtown Gallery", "description": "Explore new artworks by local artists at the gallery opening reception.", "activityName": "Art Gallery Hop" },
        { "name": "Sunset Cruise", "cost": 50.00, "time": "2024-08-18T17:30:00", "location": "Marina Pier 5", "description": "Enjoy breathtaking views of the sunset aboard a luxury yacht cruise.", "activityName": "Boating" },
        { "name": "Wine and Cheese Tasting", "cost": 30.00, "time": "2024-09-05T19:00:00", "location": "Vineyard Estate", "description": "Indulge in a delightful evening of wine and cheese pairings at the vineyard.", "activityName": "Wine Tasting" },
        { "name": "Haunted House Party", "cost": 25.00, "time": "2024-10-31T20:00:00", "location": "Creepy Manor", "description": "Embark on a spine-chilling tour through a haunted mansion filled with ghostly surprises.", "activityName": "Party" },
        { "name": "Salsa Dancing Night", "cost": 15.00, "time": "2024-11-15T21:00:00", "location": "Latin Club", "description": "Put on your dancing shoes and join us for a night of energetic salsa dancing.", "activityName": "Dancing" },
        { "name": "Christmas Market Stroll", "cost": 0.00, "time": "2024-12-10T16:00:00", "location": "Downtown Square", "description": "Experience the festive atmosphere of the holiday market with festive treats and crafts.", "activityName": "Stroll" },
        { "name": "New Year's Eve Gala", "cost": 150.00, "time": "2024-12-31T20:00:00", "location": "Grand Ballroom", "description": "Welcome the new year in style with live music, gourmet dinner, and champagne toast.", "activityName": "Party" },
        { "name": "Fitness Bootcamp", "cost": 20.00, "time": "2025-01-15T07:00:00", "location": "City Park", "description": "Kickstart your fitness journey with a high-intensity bootcamp workout in the park.", "activityName": "Exercise" },
        { "name": "Film Festival Screening", "cost": 12.00, "time": "2025-02-20T19:30:00", "location": "Cinema Plaza", "description": "Discover independent films and international cinema at the annual film festival.", "activityName": "Movies" },
        { "name": "Tech Conference", "cost": 300.00, "time": "2025-03-10T09:00:00", "location": "Convention Center", "description": "Explore the latest trends in technology and network with industry professionals at the conference.", "activityName": "Networking" },
        { "name": "Spring Flower Festival", "cost": 0.00, "time": "2025-04-05T10:00:00", "location": "Botanical Gardens", "description": "Admire the vibrant blooms and participate in floral workshops at the annual flower festival.", "activityName": "Botanical Garden Visit" },
        { "name": "Charity Gala Dinner", "cost": 100.00, "time": "2025-05-20T18:30:00", "location": "Luxury Hotel", "description": "Support a good cause and enjoy an elegant evening of dining and entertainment at the charity gala.", "activityName": "Charity" },
        { "name": "Summer Music Festival", "cost": 75.00, "time": "2025-06-15T12:00:00", "location": "City Park", "description": "Groove to live music performances and indulge in delicious food truck offerings at the music festival.", "activityName": "Concert" },
        { "name": "Cultural Food Fair", "cost": 10.00, "time": "2025-07-08T17:00:00", "location": "Ethnic Village", "description": "Sample culinary delights from around the world and enjoy cultural performances at the food fair.", "activityName": "Festival" },
        { "name": "Summer Camp Adventure", "cost": 300.00, "time": "2025-08-02T09:00:00", "location": "Mountain Retreat", "description": "Embark on outdoor adventures, team-building activities, and campfire evenings at the summer camp.", "activityName": "Camping" },
        { "name": "Backyard Movie Night", "cost": 0.00, "time": "2025-09-14T19:00:00", "location": "Sarah's House", "description": "Gather under the stars for a cozy movie night with popcorn and blankets in the backyard.", "activityName": "Movies" },
        { "name": "Wine Tour and Tasting", "cost": 50.00, "time": "2025-10-20T11:00:00", "location": "Winery Trail", "description": "Explore scenic vineyards and savor exquisite wines on a guided wine tour.", "activityName": "Wine Tasting" },
        { "name": "Hiking Expedition", "cost": 0.00, "time": "2025-11-12T08:00:00", "location": "Mountain Range", "description": "Embark on a challenging hike through breathtaking mountain trails and scenic vistas.", "activityName": "Hiking" },
        { "name": "Christmas Carol Sing-Along", "cost": 5.00, "time": "2025-12-22T19:00:00", "location": "Community Center", "description": "Spread holiday cheer with a festive sing-along of beloved Christmas carols.", "activityName": "Community" },
    ]

    //make activities
    for (let i = 0; i < activityArr.length; i++) {
        await prisma.activity.create({
            data: {
                name: activityArr[i].name,
                outdoors: activityArr[i].outdoors,
                indoors: activityArr[i].indoors,
                timeSensitive: activityArr[i].timeSensitive,
                weatherDependent: activityArr[i].weatherDependent,
            }
        })
    }
    //make experiences
    for (let i = 0; i < experienceArr.length; i++) {
        await prisma.experience.create({
            data: {
                name: experienceArr[i].name,
                cost: experienceArr[i].cost,
                time: experienceArr[i].time,
                location: experienceArr[i].location,
                description: experienceArr[i].description,
                activityName: experienceArr[i].activityName,
            }
        })
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})