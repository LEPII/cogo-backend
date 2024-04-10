import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserTrips(req, res) {
    try {
        // const activities = await prisma.activity.findMany()
        // if (!activities) {
        //     return res.status(404).json("No activities in database")
        // }
        return res.status(200).json('route working')
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}

export async function createTrip(req, res) {
    const hostId = req.body.userId
    const designatedDriverId = req.body.designatedDriverId
    const capacity = req.body.capacity
    const budget = req.body.budget
    const experienceId = req.body.experienceId
    const friendsOnly = req.body.friendsOnly
    if (!hostId || typeof budget === "string" || typeof capacity === "string" || !experienceId || typeof friendsOnly !== "boolean") {
        res.status(404).json('Insufficient or wrong information')
    }
    try {
        // const activities = await prisma.activity.findMany()
        // if (!activities) {
        //     return res.status(404).json("No activities in database")
        // }
        return res.status(200).json('route working')
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}