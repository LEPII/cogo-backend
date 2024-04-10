import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllExperiences(req, res) {
    try {
        const experiences = await prisma.experience.findMany()
        if (experiences.length === 0) {
            return res.status(404).json("no experiences found")
        }
        return res.status(200).json(experiences)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}

export async function createExperience(req, res) {
    const name = req.body.name
    const cost = req.body.cost
    const time = req.body.time
    const location = req.body.location
    const description = req.body.description
    const activityName = req.body.activityName
    if (!name || typeof cost === "string" || !time || !location || !description || !activityName) {
        return res.status(404).json('Insufficient information provided to make an experience')
    }
    try {
        await prisma.experience.create({
            data: {
                name: name,
                cost: cost,
                time: time,
                location: location,
                description: description,
                activityName: activityName,
            }
        })
        return res.status(200).json('experience created')
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}