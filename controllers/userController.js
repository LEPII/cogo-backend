import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserInfo(req, res) {
    const userEmail = req.query.userEmail
    const userPassword = req.query.userPassword
    if (!userEmail || !userPassword) {
        return res.status(404).json("No email or password provided")
    }
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: userEmail,
                password: userPassword
            }
        })
        if (!user) {
            return res.status(404).json("No such user found")
        }
        console.log(user)
        return res.json(user);
    } catch (e) {
        console.error(e);
        return res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function createUser(req, res) {
    const newUserInfo = req.body
    const newUserEmail = req.body.email
    const displayName = req.body.displayName
    const location = req.body.location
    const radius = req.body.radius
    const password = req.body.password
    const transportation = req.body.transportation
    const transportationCap = req.body.transportationCap
    const interests = req.body.interests
    if (!newUserInfo || !newUserEmail || !displayName || !location || !radius || !password || !transportation) {
        return res.status(404).json("Unsufficient user data provided")
    }
    try {
        const newUser = await prisma.user.findUnique({
            where: {
                email: newUserEmail
            }
        })
        if (!newUser) {
            await prisma.user.create({
                data: {
                    email: newUserEmail,
                    displayName: displayName,
                    location: location,
                    radius: radius,
                    password: password,
                    transportation: transportation,
                    transportationCap: transportationCap,
                    interests: interests,
                }
            })
            return res.status(201).json("User successfully created");
        } else {
            return res.status(401).json("User already exists")
        }
    } catch (e) {
        console.error(e);
        return res.status(401).json(`An error occurred while creating account. ${e}`);
    } finally {
        await prisma.$disconnect();
    }
}