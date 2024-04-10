import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserTrips(req, res) {
    const userId = req.query.userId
    if (!userId) {
        return res.status(404).json('No user id provided')
    }
    try {
        const userTrips = await prisma.tripMember.findMany({
            where: {
                userId: userId
            }
        })
        return res.status(200).json(userTrips)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}

export async function createTrip(req, res) {
    const hostId = req.body.hostId
    const name = req.body.name
    const designatedDriverId = req.body.designatedDriverId
    const capacity = req.body.capacity
    const budget = req.body.budget
    const experienceId = req.body.experienceId
    const friendsOnly = req.body.friendsOnly
    const members = req.body.members
    console.log(typeof hostId)
    if (!hostId || typeof budget === "string" || typeof capacity === "string" || !experienceId || typeof friendsOnly !== "boolean" || !name || !members) {
        return res.status(404).json('Insufficient or wrong information')
    }
    try {
        if (designatedDriverId) {
            await prisma.trip.create({
                data: {
                    host: {
                        connect: {
                            id: hostId,
                        },
                    },
                    name: name,
                    capacity: capacity,
                    budget: budget,
                    experience: {
                        connect: {
                            id: experienceId
                        }
                    },
                    friendsOnly: friendsOnly,
                    members: members,
                    designatedDriver: {
                        connect: {
                            id: designatedDriverId
                        }
                    }
                }
            })
        } else {
            await prisma.trip.create({
                data: {
                    host: {
                        connect: {
                            id: hostId,
                        },
                    },
                    name: name,
                    capacity: capacity,
                    budget: budget,
                    experience: {
                        connect: {
                            id: experienceId
                        }
                    },
                    friendsOnly: friendsOnly,
                    members: members,
                }
            })
        }
        return res.status(200).json('new trip made')
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}