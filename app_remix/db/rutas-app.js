import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bodyParser from "body-parser";


/* ESTRUCUTRA DEL DOCUMENTO: 
- Función authorized: middleware para la autenticación el cuál posteriormnete añadiremos en las rutas deseadas
- Gestión de rutas (especificado en cada ruta)
*/



//---------------------------- AUTENTICACIÓN EN RUTAS ----------------------------

function authorized(req, res, next) {
    if (!req.user || req.user.id !== req.params.user_id) { //si no coincide el usuario, y su id no es igual a variable en ruta
       res.status(403).send("Unauthorized");//respondemos con un 403 - no autorizado
   return;
   }
   else{console.log("Unauthorizednull");}
   next();
   }



//---------------------------- CÓDIGO PARA LA GESTIÓN DE RUTAS ----------------------------

//Definimos una función que recoja el código dónde se gestionan las rutas de la aplicación

export default function rutasApp (app) {

    //GET: ruta para recibir los usuarios incluyendo sus listas:
  app.get("/users/:user_id/list", authorized, (req, res) => {
    const usuarioId = req.params.user_id;

prisma.usuario
  .findUnique({
    where: {
      id: usuarioId,
    },
    include: {
      listas: true,
    },
  })
  .then((user) => {
    res.send(user);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
})

//POST: ruta para crear listas:
//este POST se realizará con el formulario directamente desde el navegador, con lo cuál utilizamos el middleware bodyParser.urlencoded()
app.post("/users/:user_id/list",  bodyParser.urlencoded({ extended: true }),  authorized, (req, res) => { 
    const nuevaLista = req.body.titulo
    const usuarioID = req.params.user_id

    prisma.lista.create ({
        data: {
            titulo: nuevaLista,
            
            usuario: { 
                connect: { //conectamos la creación de la lista al usuario
                    id: usuarioID
                }
          },
        }
            }).then(nuevaLista => {
            console.log(nuevaLista);
            res.status(201).redirect(`/app_tareas/${usuarioID}`);
        }).catch(error => {
            res.status(400).send(error)
        } )
});

//PUT: ruta para editar listas:
app.put("/users/:user_id/list/:list_id", authorized, (req, res) => {
    const listaModificada = req.params.list_id;
    const tituloLista = req.body.titulo

    prisma.lista.update({
        where: {
            id: listaModificada 
            },
            data: {
                 titulo: tituloLista
            }
        }).then(listaActualizada => {
       res.send(listaActualizada)
    }).catch(error => {
        res.status(400).send(error)
    })
});

//DELETE: ruta para borrar listas:
app.delete("/users/:user_id/list/:list_id", authorized, async (req, res) => {
  const listId = req.params.list_id;

  try { // Para evitar errores en el esquema de Prisma y poder eliminar las listas aun que estas contengan tareas:
    // Primero eliminamos las tareas asociadas a la lista
    await prisma.tarea.deleteMany({
      where: {
        listaId: listId,
      },
    });

    // Después eliminamos la lista
    const listaEliminada = await prisma.lista.delete({
      where: {
        id: listId,
      },
    });

    res.send(listaEliminada);
  } catch (error) {
    res.send(error);
  }
});


//GET: ruta para recibir las tareas de la lista: 
app.get("/:user_id/list/:list_id/tasks", authorized, (req, res) => {
    const listaId = req.params.list_id

prisma.lista.findUnique({
    where: {
        id: listaId 
    },
    include: {
        tareas: true
    }
}).then((tareas) => {
   res.send(tareas);
}).catch(error => {
    res.status(400).send(error)
} )
}) 

//POST: ruta para crear tareas:
app.post("/:user_id/list/:list_id/tasks", authorized, (req, res) => { 
    const nuevaTarea1 = req.body.descripcion
    const listaId = req.params.list_id

    prisma.tarea
      .create({
        data: {
          descripcion: nuevaTarea1,

          lista: {
            connect: {
              id: listaId,
            },
          },
        },
      })
      .then((nuevaTarea) => {
        console.log(nuevaTarea.descripcion);
        res.status(201).send(nuevaTarea);
      })
      .catch((error) => {
        res.status(400).send(error);
        console.log("error");
      });
});

//Put: ruta para editar tareas:
app.put("/:user_id/list/:list_id/tasks/:task_id", authorized, (req, res) => {
    const tareaEditada = req.params.task_id;
    const descripcion = req.body.descripcion

    prisma.tarea.update({
        where: {
            id: tareaEditada 
            },
            data: {
                 descripcion: descripcion
            }
        }).then(tareaActualziada => {
       res.send(tareaActualziada)
    }).catch(error => {
        res.status(400).send(error)
    })
});

//DELETE: ruta para borrar tareas:
app.delete("/:user_id/list/:list_id/tasks/:task_id", authorized, (req, res) => {
    const tareaParaBorrar = req.params.task_id;
    prisma.tarea.delete({
        where: {
        id: tareaParaBorrar
    }
    }).then(tareaEliminada => {
        res.send(tareaEliminada);
    }).catch(error =>{
        res.send(error)
    })  
}); 
}