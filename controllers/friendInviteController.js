import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getFriendInvites(req, res) {
    const userId = req.query.userId
    if (!userId) {
        return res.status(200).send('no user id provided')
    }
    try {
        const userFriendInvitesPending = await prisma.friendInvite.findMany({
            where: {
                receiverId: userId,
                pending: true,
            }
        })
        return res.status(200).send(userFriendInvitesPending)
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
    const friendInviteId = req.body.friendInviteId
    if (!userId || !friendInviteId) {
        return res.status(404).json('no user id or friend invite id provided')
    }
    try {
        const foundInvite = await prisma.friendInvite.findUnique({
            where: {
                id: friendInviteId,
                receiverId: userId
            }
        })
        console.log(foundInvite)
        if (!foundInvite) {
            return res.status(404).json('no valid invite found')
        }
        await prisma.friendInvite.update({
            where: {
                id: friendInviteId,
            },
            data: {
                accepted: true, // Set 'accepted' to true
                pending: false, // Set 'pending' to false
            },
        })
        const userReceiver = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        const userSender = await prisma.user.findUnique({
            where: {
                id: foundInvite.senderId
            }
        })
        // console.log(userReceiver)
        // console.log(userSender)
        const userReceiverCurrentFriends = userReceiver.friends || [];
        const userReceiverUpdatedFriends = [...userReceiverCurrentFriends, userSender.id];
        const userSenderCurrentFriends = userSender.friends || [];
        const userSenderUpdatedFriends = [...userSenderCurrentFriends, userReceiver.id];
        await prisma.user.update({
            where: {
                id: userReceiver.id,
            },
            data: {
                friends: userReceiverUpdatedFriends,
            },
        })
        await prisma.user.update({
            where: {
                id: userSender.id,
            },
            data: {
                friends: userSenderUpdatedFriends,
            },
        })
        return res.status(200).json('friend invite accepted')
    } catch (e) {
        console.log(e)
        return res.status(404).json(e)
    } finally {
        await prisma.$disconnect();
    }
}