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
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId
    const tripId = req.body.tripId
    if (!senderId || !receiverId || !tripId) {
        return res.status(404).send('sender receiver or trip id is missing')
    }
    try {
        await prisma.tripInvite.create({
            data: {
                senderId,
                receiverId,
                tripId
            }
        })
        return res.status(200).json('trip invite made successfully')
    } catch (e) {
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}

export async function acceptTripInvite(req, res) {
    const tripInviteId = req.body.tripInviteId
    if (!tripInviteId) {
        return res.status(404).send('trip invite id is missing')
    }
    try {
        const tripInviteFound = await prisma.tripInvite.findUnique({
            where: {
                id: tripInviteId
            }
        })
        if (!tripInviteFound) {
            return res.status(404).json('no such invite exists')
        }
        await prisma.tripInvite.update({
            where: {
                id: tripInviteId,
            },
            data: {
                accepted: true, // Set 'accepted' to true
                pending: false, // Set 'pending' to false
            },
        });
        await prisma.tripMember.create({
            data: {
                tripId: tripInviteFound.tripId,
                userId: tripInviteFound.receiverId,
            }
        })
        const foundTrip = await prisma.trip.findUnique({
            where: {
                id: tripInviteFound.tripId
            }
        })
        if (!foundTrip) {
            return res.status(404).json('No such trip exists');
        }
        const currentMembers = foundTrip.members || [];
        const updatedMembers = [...currentMembers, tripInviteFound.receiverId];
        await prisma.trip.update({
            where: {
                id: tripInviteFound.tripId,
            },
            data: {
                members: updatedMembers,
            },
        });
        return res.status(200).json('invite accepted')
    } catch (e) {
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}