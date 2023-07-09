const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

prisma.usuario.create ({
    data: {
        nombre: "Tania",
    }
}). then(usuario => {
    console.log(usuario);
})