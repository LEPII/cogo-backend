import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getFriendInvites(req, res) {
    return res.status(200).send('route is working')
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