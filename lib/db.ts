import { PrismaClient } from '@prisma/client'

const db = new PrismaClient();

db.user.create({
    data: {
        username: "bichobi",
        password: "1111"
    }
})