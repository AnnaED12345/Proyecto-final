import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

//Script para la creación de usuarios: 

// código para encriptar la contraseña: 
async function crearUsuarios (nombre, email, password) {
    //1. Definimos el salt
    //salt: cadena de caracteres aleatorios que se añade a la contraseña antes de hacer el hash.
    const salt = await bcrypt.genSalt(10); //generamos la salt
    /* console.log("#SALT", salt); */
    const hashedPassword = await bcrypt.hash(password, salt); //generamos hash
    console.log("#PASSWORD", nombre, password, "#HASH", hashedPassword);

    prisma.usuario.createMany ({
        data:{ 
            name: nombre,
            email: email, 
            password: hashedPassword
        },
        
            }). then(usuario => {
            console.log(usuario);
        }) 
}

crearUsuarios("Mario", "eduardo@gmail.com", "111");
crearUsuarios("Juan", "juan@gmail.com", "222");
crearUsuarios("Eva", "eva@gmail.com", "333");



//Script para encontrar a todos los usuarios: 

/*   prisma.usuario.findMany()
  .then((usuarios) => {
    console.log(usuarios);
  })*/


  //Eliminar
  /*  prisma.usuario.deleteMany({
    }).then(user => {
        console.log(user);
    });  */


    /*  prisma.lista.deleteMany({
    }).then(lista => {
        console.log(lista);
    });   */

    /*   prisma.tarea.deleteMany({
    }).then(tarea => {
        console.log(tarea);
    });   */

/*  prisma.tarea.create ({
    data: {
        descripcion: "tarea 01",
        
        lista: { //indicamos el campo de usuario
            connect: { //y conectamos la creación de la tarea
                id: "64ac63c759537e70f8a0f290"
            }
      },
    }
        }).then(tarea => {
        console.log(tarea);
    }) 
     */
