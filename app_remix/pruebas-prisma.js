import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

prisma.usuario.create ({
    data: {
        nombre: "Lucas",
    }
}). then(usuario => {
    console.log(usuario);
})