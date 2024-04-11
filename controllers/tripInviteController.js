import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserTripInvites(req, res) {
    const userId = req.query.userId
    if (!userId) {
        return res.status(404).json('no user id provided')
    }
    try {
        const userTripInvites = await prisma.tripInvite.findMany({
            where: {
                receiverId: userId
            }
        })
        return res.status(200).json(userTripInvites)
    } catch (e) {
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}

export async function createTripInvite(req, res) {
    try {
        return res.status(200).json('route is working')
    } catch (e) {
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}