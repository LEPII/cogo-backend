import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getFriendInvites(req, res) {
    const userId = req.query.userId
    if (!userId) {
        return res.status(200).send('no user id provided')
    }
    try {
        const userFriendInvites = await prisma.friendInvite.findMany({
            where: {
                receiverId: userId
            }
        })
        return res.status(200).send(userFriendInvites)
    } catch (e) {
        console.log(e)
        return res.status(404).send(e)
    } finally {
        await prisma.$disconnect();
    }

}

export async function createFriendInvite(req, res) {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId
    if (!senderId || !receiverId) {
        return res.status(404).send('sender or receiver id is missing')
    }
    try {
        await prisma.friendInvite.create({
            data: {
                senderId,
                receiverId
            }
        })
        return res.status(200).send('invite successfully sent')
    } catch (e) {
        console.log(e)
        return res.status(404).send(e)
    } finally {
        await prisma.$disconnect();
    }
}

export async function acceptFriendInvite(req, res) {
    const userId = req.body.userId
    if (!userId) {
        return res.status(404).json('no user id provided')
    }
    try {

    } catch (e) {
        console.log(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}