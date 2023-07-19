import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

/* Script para la creación de usuarios: 
ESTRUCTURA DEL DOCUMENTO: 
  - crearUsuarios() función para la creación de los usuarios: 
     - código para la encriptación de la contaseña utilizando bcrypt
     - Prisma.createMany
 - Creación de los usuarios manualmente
*/


        async function crearUsuarios (nombre, email, password) {
    //salt: genera una cadena de caracteres aleatorios que se añade a la contraseña antes de hacer el hash.
    const salt = await bcrypt.genSalt(10); 
    //hash: representación cifrada de la contraseña original. 
    const hashedPassword = await bcrypt.hash(password, salt); 
    console.log("#PASSWORD", nombre, password, "#HASH", hashedPassword);

    prisma.usuario
      .createMany({
        //creamos un usuario con nombre, email y contraseña encriptada
        data: {
          name: nombre,
          email: email,
          password: hashedPassword,
        },
      })
      .then((usuario) => {
        console.log(usuario);
      }); 
}

crearUsuarios("Mario", "mario@gmail.com", "111");
crearUsuarios("Lucas", "lucas@gmail.com", "222");
crearUsuarios("Eva", "eva@gmail.com", "333");
/* crearUsuarios("Prueba", "prueba@gmail.com", "000"); */



 

   

