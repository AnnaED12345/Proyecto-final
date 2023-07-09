import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Script para la creación de usuarios: 

/* prisma.usuario.createMany({
    data: [
      {
        name: 'Mario',
        email: 'mario@gmail.com',
        password: 'contraseña1',
      },
      {
        name: 'Juan',
        email: 'juan@gmail.com',
        password: 'contraseña2',
      },
      {
        name: 'Eva',
        email: 'eva@gmail.com',
        password: 'contraseña3',
      },
    ],
  })
  .then((usuarios) => {
    console.log(usuarios);
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
  }); */




//Script para encontrar a todos los usuarios: 

/*   prisma.usuario.findMany()
  .then((usuarios) => {
    console.log(usuarios);
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
  }); */

