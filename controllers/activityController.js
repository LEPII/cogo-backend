import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllActivities(req, res) {
    try {
        const activities = await prisma.activity.findMany()
        if (!activities) {
            return res.status(404).json("No activities in database")
        }
        return res.status(200).json(activities)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}

export async function getSomeActivities(req, res) {
    // request url should look like
    //http://localhost:9000/api/activity/some?param=beach,volleyball,hiking
    const userActivities = req.query.param.split(',');
    if (!userActivities) {
        res.status(404).json("No activities provided")
    }
    try {
        let foundActivities = await Promise.all(userActivities.map((activity) => {
            console.log(activity);
            return prisma.activity.findMany({
                where: {
                    name: {
                        contains: activity,
                        mode: 'insensitive'
                    }
                }
            });
        }));

        if (foundActivities.length === 0) {
            return res.status(204).json('no activities found')
        }
        return res.status(200).json(foundActivities)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
    res.status(200).json(userActivities)
}