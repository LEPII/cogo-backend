import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getFriendInvites(req, res) {
    return res.status(200).send('route is working')
}

export async function createFriendInvite(req, res) {
    return res.status(200).send('route is working')
}